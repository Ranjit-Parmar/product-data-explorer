// import { Controller, Get, Post, Param, Body, ParseIntPipe } from '@nestjs/common';
// import { ProductService } from './product.service';
// import { Product } from './product.entity';

// @Controller('product')
// export class ProductController {
//   constructor(private prodService: ProductService) {}

//   @Get()
//   findAll(): Promise<Product[]> {
//     return this.prodService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number): Promise<Product | null> {
//     return this.prodService.findOne(id);
//   }

//   @Post()
//   create(@Body() body: any): Promise<Product> {
//     return this.prodService.create(body);
//   }
// }







import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  getAll() {
    return this.productService.findAll();
  }

  @Get('category/:catId')
  getByCategory(@Param('catId') catId: string) {
    return this.productService.findByCategory(+catId);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
}
