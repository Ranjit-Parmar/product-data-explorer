import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductDetail } from "src/product-detail/product-detail.entity";
import { Product } from "src/product/product.entity";
import { ScrapeJob } from "src/scrape-job/scrape-job.entity";
import { ScrapeJobService } from "src/scrape-job/scrape-job.service";
import { ScrapeTargetType } from "src/scrape-job/scrape-job.types";
import { Repository } from "typeorm";
import { chromium } from 'playwright';

export interface ProductDetailScrapeJobMeta {
  navigationId: number;
  categorySlug: string;
}

@Injectable()
export class ProductDetailScraper {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @InjectRepository(ProductDetail)
    private detailRepo: Repository<ProductDetail>,
    private jobService: ScrapeJobService,
  ) {}

  async scrape(job: ScrapeJob) {
    const url = job.targetUrl;
    const meta = job.meta as ProductDetailScrapeJobMeta | undefined;

    if (!meta?.categorySlug) {
      throw new Error('categorySlug missing in job meta');
    }

    // Fetch product by sourceUrl
    const product = await this.productRepo.findOne({
      where: { sourceUrl: url },
    });

    if (!product) {
      throw new Error(`Product with URL ${url} not found`);
    }

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'domcontentloaded' });

    const description = (await page.textContent('.description')) || '';
    const ratingText = (await page.textContent('.rating')) || '0';
    const rating = Number(ratingText.replace(/[^\d.]/g, ''));

    await this.detailRepo.save({
      product,
      description,
      ratingsAvg: rating,
    });

    // Enqueue REVIEW jobs
    await this.jobService.enqueue({
      targetUrl: url,
      targetType: ScrapeTargetType.REVIEW,
      meta: {
        categorySlug: meta.categorySlug,
        navigationId: meta.navigationId,
      },
    });

    await browser.close();
  }
}
