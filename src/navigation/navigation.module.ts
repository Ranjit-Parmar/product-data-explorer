// import { Module } from '@nestjs/common';
// import { NavigationService } from './navigation.service';
// import { NavigationController } from './navigation.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Navigation } from './navigation.entity';
// import { Category } from 'src/category/category.entity';
// import { ScrapeJobModule } from 'src/scrape-job/scrape-job.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([Navigation, Category]), ScrapeJobModule],
//   providers: [NavigationService],
//   controllers: [NavigationController]
// })
// export class NavigationModule {}



import { Module } from '@nestjs/common';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Navigation } from './navigation.entity';
import { ScrapeJobService } from '../scrape-job/scrape-job.service';
import { ScrapeJob } from '../scrape-job/scrape-job.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Navigation, ScrapeJob])],
  controllers: [NavigationController],
  providers: [NavigationService, ScrapeJobService],
  exports: [NavigationService],
})
export class NavigationModule {}

