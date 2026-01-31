import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { chromium } from 'playwright';
import { Repository } from 'typeorm';

import { Category } from 'src/category/category.entity';
import { Navigation } from 'src/navigation/navigation.entity';
import { ScrapeJobService } from 'src/scrape-job/scrape-job.service';
import { ScrapeJob } from 'src/scrape-job/scrape-job.entity';
import { ScrapeTargetType } from 'src/scrape-job/scrape-job.types';

interface CategoryScrapeJobMeta {
  navigationId: number;
}

@Injectable()
export class CategoryScraper {
  private readonly logger = new Logger(CategoryScraper.name);

  constructor(
    @InjectRepository(Category)
    private readonly catRepo: Repository<Category>,

    @InjectRepository(Navigation)
    private readonly navRepo: Repository<Navigation>,

    private readonly jobService: ScrapeJobService,
  ) {}

  async scrape(job: ScrapeJob) {
  const url = job.targetUrl;
  const meta = job.meta as CategoryScrapeJobMeta | undefined;
  const navigationId = meta?.navigationId;

  if (!navigationId) {
    throw new Error('navigationId missing in job meta');
  }

  const navigation = await this.navRepo.findOne({
    where: { id: navigationId },
  });

  if (!navigation) {
    throw new Error(`Navigation ${navigationId} not found`);
  }

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

  /* 🍪 Cookie banner (safe) */
  try {
    const acceptBtn = page.locator('button:has-text("Accept")');
    if (await acceptBtn.isVisible({ timeout: 5000 })) {
      await acceptBtn.click();
      this.logger.log('Cookie banner accepted');
    }
  } catch {
    // ignore
  }

  /* ⏳ Let page settle */
  await page.waitForTimeout(3000);

  /* 🔍 Extract categories (SCOPED selector) */
  const categories = await page.$$eval(
    'nav a[href^="/collections"]',
    (links) =>
      links.map((el) => ({
        title: el.textContent?.trim() || '',
        slug: el.getAttribute('href') || '',
      })),
  );

  this.logger.log(`Found categories: ${categories.length}`);

  if (categories.length === 0) {
    this.logger.warn('No categories found — site structure may have changed');
    await browser.close();
    return;
  }

  /* 🧠 Track parents */
  const parentMap = new Map<string, Category>();

for (const cat of categories) {
  if (!cat.slug || !cat.title) continue;

  this.logger.log(`Saving category → ${cat.title}`);

  const parentSlug = cat.slug.split('/').slice(0, -1).join('/');
  const parent = parentMap.get(parentSlug);

  await this.catRepo.upsert(
    {
      title: cat.title,
      slug: cat.slug,
      navigation,
      parent: parent ?? null,
      lastScrapedAt: new Date(),
    },
    {
      conflictPaths: ['slug', 'navigation'],
    },
  );

  const savedCategory = await this.catRepo.findOne({
    where: {
      slug: cat.slug,
      navigation: { id: navigation.id },
    },
  });

  if (!savedCategory) continue;

  parentMap.set(cat.slug, savedCategory);

  await this.jobService.enqueue({
    targetUrl: new URL(cat.slug, url).href,
    targetType: ScrapeTargetType.PRODUCT,
    meta: {
      navigationId: navigation.id,
      categorySlug: cat.slug,
    },
  });
}


  await browser.close();
}

}
