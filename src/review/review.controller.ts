import { Controller, Get, Param } from "@nestjs/common";
import { ReviewService } from "./review.service";

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get('product/:productId')
  getReviews(@Param('productId') productId: number) {
    return this.reviewService.findByProduct(+productId);
  }
}