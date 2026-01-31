import { Controller, Post, Body } from '@nestjs/common';
import { ScrapeJobService } from './scrape-job.service';
import { ScrapeTargetType } from './scrape-job.types';

@Controller('scrape')
export class ScrapeJobController {
  constructor(private readonly scrapeJobService: ScrapeJobService) {}

  @Post('navigation')
  enqueueNavigation(@Body('url') url: string) {
    return this.scrapeJobService.enqueue({
      targetUrl: url,
      targetType: ScrapeTargetType.NAVIGATION,
    });
  }
}
