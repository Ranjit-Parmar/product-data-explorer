import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Navigation } from 'src/navigation/navigation.entity';
import { ScrapeJobService } from 'src/scrape-job/scrape-job.service';
import { ScrapeJob } from 'src/scrape-job/scrape-job.entity';
import { ScrapeTargetType } from 'src/scrape-job/scrape-job.types';
import { Repository } from 'typeorm';
import { chromium } from 'playwright';

@Injectable()
export class NavigationScraper {
  constructor(
    @InjectRepository(Navigation)
    private navRepo: Repository<Navigation>,
    private jobService: ScrapeJobService,
  ) {}

  async scrape(job: ScrapeJob) {
    const url = job.targetUrl;

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    await page.setExtraHTTPHeaders({
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
        '(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });

    await page.goto(url, {
      waitUntil: 'domcontentloaded',
      timeout: 60_000,
    });

    const items = await page.$$eval('nav a', (els) =>
      els.map((e) => ({
        title: e.textContent?.trim(),
        slug: e.getAttribute('href'),
      })),
    );

    for (const item of items) {
      if (!item.title || !item.slug) continue;

      await this.navRepo.upsert(
        {
          title: item.title,
          slug: item.slug,
          lastScrapedAt: new Date(),
        },
        ['slug'],
      );

      const nav = await this.navRepo.findOne({
        where: { slug: item.slug },
      });

      if (!nav) continue;

      await this.jobService.enqueue({
        targetUrl: new URL(item.slug, url).href,
        targetType: ScrapeTargetType.CATEGORY,
        meta: {
          navigationId: nav.id,
        },
      });
    }

    await browser.close();
  }
}
