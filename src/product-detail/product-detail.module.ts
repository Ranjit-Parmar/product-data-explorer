// import { Module } from '@nestjs/common';
// import { ProductDetailController } from './product-detail.controller';
// import { ProductDetailService } from './product-detail.service';
// import { ProductDetail } from './product-detail.entity';
// import { TypeOrmModule } from '@nestjs/typeorm';

// @Module({
//   imports: [TypeOrmModule.forFeature([ProductDetail])],
//   controllers: [ProductDetailController],
//   providers: [ProductDetailService],
//   exports: [ProductDetailService],
// })
// export class ProductDetailModule {}








import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDetail } from './product-detail.entity';
import { ProductDetailService } from './product-detail.service';
import { ProductDetailController } from './product-detail.controller';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProductDetail]), ProductModule],
  providers: [ProductDetailService],
  controllers: [ProductDetailController],
  exports: [ProductDetailService],
})
export class ProductDetailModule {}
