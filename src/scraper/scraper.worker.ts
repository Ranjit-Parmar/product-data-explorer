import { Injectable, Logger } from "@nestjs/common";
import { ScrapeJobService } from 'src/scrape-job/scrape-job.service';
import { NavigationScraper } from "./navigation/navigation.scraper";
import { CategoryScraper } from "./category/category.scraper";
import { ProductScraper } from "./product/product.scraper";
import { ProductDetailScraper } from "./product-detail/product-detail.scraper";
import { ReviewScraper } from "./review/review.scraper";
import { ScrapeJob } from "src/scrape-job/scrape-job.entity";
import { ScrapeTargetType } from 'src/scrape-job/scrape-job.types';

@Injectable()
export class ScraperWorker {
  private readonly logger = new Logger(ScraperWorker.name);

  constructor(
    private readonly jobService: ScrapeJobService,
    private readonly navScraper: NavigationScraper,
    private readonly categoryScraper: CategoryScraper,
    private readonly productScraper: ProductScraper,
    private readonly detailScraper: ProductDetailScraper,
    private readonly reviewScraper: ReviewScraper,
  ) {}

  async run() {
    this.logger.log('Scraper worker started');

    while (true) {
      const job: ScrapeJob | null = await this.jobService.getNextPendingJob();

      if (!job) {
        await new Promise(r => setTimeout(r, 2000));
        continue;
      }

      try {
        this.logger.log(`Processing job ${job.id} → ${job.targetType}`);

        switch (job.targetType) {
          case ScrapeTargetType.NAVIGATION:
            await this.navScraper.scrape(job);
            break;

          case ScrapeTargetType.CATEGORY:
            await this.categoryScraper.scrape(job);
            break;

          case ScrapeTargetType.PRODUCT:
            await this.productScraper.scrape(job);
            break;

          case ScrapeTargetType.PRODUCT_DETAIL:
            await this.detailScraper.scrape(job);
            break;

          case ScrapeTargetType.REVIEW:
            await this.reviewScraper.scrape(job);
            break;

          default:
            throw new Error(`Unknown target type ${job.targetType}`);
        }

        await this.jobService.markDone(job);
        this.logger.log(`Job ${job.id} DONE`);
      } catch (err) {
        await this.jobService.markFailed(job, err);
      }
    }
  }
}
