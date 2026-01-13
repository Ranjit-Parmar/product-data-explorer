import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NavigationModule } from './navigation/navigation.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ProductDetailModule } from './product-detail/product-detail.module';
import { ReviewModule } from './review/review.module';
import { ScrapeJobModule } from './scrape-job/scrape-job.module';
import { ViewHistoryModule } from './view-history/view-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +(process.env.DATABASE_PORT || 5432),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    NavigationModule,
    CategoryModule,
    ProductModule,
    ProductDetailModule,
    ReviewModule,
    ScrapeJobModule,
    ViewHistoryModule,
  ],
})
export class AppModule {}
