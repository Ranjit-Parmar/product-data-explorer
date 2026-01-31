import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/category.entity";
import { Product } from "src/product/product.entity";
import { ScrapeJob } from "src/scrape-job/scrape-job.entity";
import { ScrapeJobService } from "src/scrape-job/scrape-job.service";
import { ScrapeTargetType } from "src/scrape-job/scrape-job.types";
import { Repository } from "typeorm";
import { chromium } from 'playwright';

export interface ProductScrapeJobMeta {
  navigationId: number;
  categorySlug: string;
}

@Injectable()
export class ProductScraper {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(Category)
    private catRepo: Repository<Category>,
    private jobService: ScrapeJobService,
  ) {}

  async scrape(job: ScrapeJob) {
    const url = job.targetUrl;
    const meta = job.meta as ProductScrapeJobMeta | undefined;

    if (!meta?.categorySlug) {
      throw new Error('categorySlug missing in job meta');
    }

    // Fetch category by slug
    const category = await this.catRepo.findOne({ where: { slug: meta.categorySlug } });
    if (!category) {
      throw new Error(`Category ${meta.categorySlug} not found`);
    }

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const products = await page.$$eval('.product-card', els =>
      els.map(e => ({
        title: e.querySelector('.title')?.textContent?.trim(),
        price: e.querySelector('.price')?.textContent?.trim(),
        link: e.querySelector('a')?.href,
      })),
    );

    for (const p of products) {
      if (!p.title || !p.link) continue;

      await this.productRepo.save({
        title: p.title,
        price: p.price ? Number(p.price.replace(/[^\d]/g, '')) : 0,
        currency: 'USD',
        sourceId: p.link,
        sourceUrl: p.link,
        category,
        lastScrapedAt: new Date(),
      });

      await this.jobService.enqueue({
        targetUrl: p.link,
        targetType: ScrapeTargetType.PRODUCT_DETAIL,
        meta: {
          categorySlug: meta.categorySlug,
          navigationId: meta.navigationId,
        },
      });
    }

    await browser.close();
  }
}
