// src/product/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductDetail } from '../product-detail/product-detail.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Review } from 'src/review/review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductDetail, Review])], // <-- include Category
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
