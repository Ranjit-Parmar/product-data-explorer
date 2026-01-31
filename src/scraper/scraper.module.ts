import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ScraperWorker } from './scraper.worker';

// Entities
import { Navigation } from '../navigation/navigation.entity';
import { Category } from '../category/category.entity';
import { Product } from '../product/product.entity';
import { ProductDetail } from '../product-detail/product-detail.entity';
import { Review } from '../review/review.entity';
import { ScrapeJob } from '../scrape-job/scrape-job.entity';

// Services
import { ScrapeJobService } from '../scrape-job/scrape-job.service';
import { NavigationScraper } from './navigation/navigation.scraper';
import { CategoryScraper } from './category/category.scraper';
import { ProductScraper } from './product/product.scraper';
import { ProductDetailScraper } from './product-detail/product-detail.scraper';
import { ReviewScraper } from './review/review.scraper';

// Scrapers

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Navigation,
      Category,
      Product,
      ProductDetail,
      Review,
      ScrapeJob,
    ]),
  ],
  providers: [
    ScrapeJobService,
    ScraperWorker,

    NavigationScraper,
    CategoryScraper,
    ProductScraper,
    ProductDetailScraper,
    ReviewScraper,
  ],
})
export class ScraperModule implements OnModuleInit {
  constructor(private readonly worker: ScraperWorker) {}

  async onModuleInit() {
    // start background worker loop
    this.worker.run();
  }
}
