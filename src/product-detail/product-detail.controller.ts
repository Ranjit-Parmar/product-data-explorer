// import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// import { ProductDetailService } from './product-detail.service';

// @Controller('product-detail')
// export class ProductDetailController {
//   constructor(private detailService: ProductDetailService) {}

//   @Get()
//   findAll() {
//     return this.detailService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.detailService.findOne(+id);
//   }

//   @Post()
//   create(@Body() body: any) {
//     return this.detailService.create(body);
//   }
// }










import { Controller, Get, Param } from '@nestjs/common';
import { ProductDetailService } from './product-detail.service';

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly detailService: ProductDetailService) {}

  @Get(':productId')
  getDetail(@Param('productId') productId: string) {
    return this.detailService.findOne(+productId);
  }
}
