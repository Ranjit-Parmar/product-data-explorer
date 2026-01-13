// import { Controller, Get, Param, Post, Query } from '@nestjs/common';
// import { ProductService } from './product.service';

import { Controller, Get, Param, Post } from "@nestjs/common";
import { ProductService } from "./product.service";

// @Controller()
// export class ProductController {
//   constructor(private readonly productService: ProductService) {}

//   @Get('categories/:id/products')
//   findByCategory(
//     @Param('id') id: number,
//     @Query('limit') limit = 10,
//     @Query('page') page = 1,
//   ) {
//     return this.productService.findByCategory(id, +limit, +page);
//   }

//   @Post('categories/:id/products/refresh')
//   refreshCategoryProducts(@Param('id') id: number) {
//     return this.productService.refreshCategory(id);
//   }

//   @Get('products/:id')
//   findOne(@Param('id') id: number) {
//     return this.productService.findOne(id);
//   }

//   @Post('products/:id/refresh')
//   refreshProduct(@Param('id') id: number) {
//     return this.productService.refreshProduct(id);
//   }
// }








@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('category/:categoryId')
  getProductsByCategory(@Param('categoryId') categoryId: number) {
    return this.productService.findByCategory(+categoryId);
  }

  @Get(':id')
  getProduct(@Param('id') id: number) {
    return this.productService.findOne(+id);
  }

    @Post(':id/refresh')
  refreshProduct(@Param('id') id: number) {
    return this.productService.refreshProduct(id);
  }
}
