import { Module } from '@nestjs/common';
import { ScrapeJobController } from './scrape-job.controller';
import { ScrapeJobService } from './scrape-job.service';

@Module({
  controllers: [ScrapeJobController],
  providers: [ScrapeJobService]
})
export class ScrapeJobModule {}
