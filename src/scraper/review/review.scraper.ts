import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "src/product/product.entity";
import { Review } from "src/review/review.entity";
import { Repository } from "typeorm";
import { ScrapeJob } from "src/scrape-job/scrape-job.entity";
import { chromium } from 'playwright';

export interface ReviewScrapeJobMeta {
  navigationId: number;
  categorySlug: string;
  productSourceUrl: string;
}

@Injectable()
export class ReviewScraper {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async scrape(job: ScrapeJob) {
    const url = job.targetUrl;
    const meta = job.meta as ReviewScrapeJobMeta | undefined;

    // Safety checks
    if (!meta?.productSourceUrl) {
      throw new Error('productSourceUrl missing in job meta');
    }

    const product = await this.productRepo.findOne({
      where: { sourceUrl: meta.productSourceUrl },
    });

    if (!product) {
      throw new Error(`Product with URL ${meta.productSourceUrl} not found`);
    }

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const reviews = await page.$$eval('.review', (els) =>
      els.map((e) => ({
        author: e.querySelector('.author')?.textContent || 'Anonymous',
        rating: Number(e.querySelector('.stars')?.textContent?.replace(/[^\d.]/g, '') || 0),
        text: e.querySelector('.text')?.textContent || '',
      })),
    );

    for (const r of reviews) {
      await this.reviewRepo.save({
        product,
        author: r.author,
        rating: r.rating,
        text: r.text,
      });
    }

    await browser.close();
  }
}
