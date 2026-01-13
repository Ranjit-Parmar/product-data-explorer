import { Controller, Get, Param, Post } from "@nestjs/common";
import { ProductDetailService } from "./product-detail.service";

@Controller('product-detail')
export class ProductDetailController {
  constructor(private readonly detailService: ProductDetailService) {}

  @Get(':productId')
  getDetail(@Param('productId') productId: number) {
    return this.detailService.findOne(+productId);
  }

  @Post(':id/refresh')
  refreshProductDetail(@Param('id') id: number){
    return this.detailService.refreshProductDetail(id)
  }
}
