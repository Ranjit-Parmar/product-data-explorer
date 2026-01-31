// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Category } from './category.entity';
// import { CategoryService } from './category.service';
// import { CategoryController } from './category.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Category])],
//   providers: [CategoryService],
//   controllers: [CategoryController],
//   exports: [CategoryService],
// })
// export class CategoryModule {}







import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { NavigationModule } from '../navigation/navigation.module';
import { ScrapeJobModule } from '../scrape-job/scrape-job.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    NavigationModule,
    ScrapeJobModule,
  ],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
