// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ScrapeJobService } from './scrape-job.service';
// import { ScrapeJob } from './scrape-job.entity';

// @Module({
//   imports: [TypeOrmModule.forFeature([ScrapeJob])],
//   providers: [ScrapeJobService],
//   exports: [ScrapeJobService],
// })
// export class ScrapeJobModule {}






import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScrapeJob } from './scrape-job.entity';
import { ScrapeJobService } from './scrape-job.service';
import { ScrapeJobController } from './scrape-job.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ScrapeJob])],
  providers: [ScrapeJobService],
  controllers: [ScrapeJobController],
  exports: [ScrapeJobService],
})
export class ScrapeJobModule {}
