// import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// import { ReviewService } from './review.service';

// @Controller('reviews')
// export class ReviewController {
//   constructor(private reviewService: ReviewService) {}

//   @Get()
//   findAll() {
//     return this.reviewService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.reviewService.findOne(+id);
//   }

//   @Post()
//   create(@Body() body: any) {
//     return this.reviewService.create(body);
//   }
// }









import { Controller, Get, Param } from '@nestjs/common';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productId')
  getReviews(@Param('productId') productId: string) {
    return this.reviewService.findByProduct(+productId);
  }
}
