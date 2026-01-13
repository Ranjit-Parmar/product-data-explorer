// src/category/category.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Product } from '../product/product.entity'; // <-- import Product
import { Navigation } from '../navigation/navigation.entity'; // <-- import Navigation
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Navigation, Product])], // <-- include Product here
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
