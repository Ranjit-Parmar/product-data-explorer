// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Product } from './product.entity';
// import { ProductDetail } from '../product-detail/product-detail.entity';
// import { Review } from '../review/review.entity';
// import { ProductService } from './product.service';
// import { ProductController } from './product.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([Product, ProductDetail, Review])],
//   providers: [ProductService],
//   controllers: [ProductController],
//   exports: [ProductService],
// })
// export class ProductModule {}







import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
