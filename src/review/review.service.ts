// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Review } from './review.entity';

// @Injectable()
// export class ReviewService {
//   constructor(
//     @InjectRepository(Review)
//     private reviewRepo: Repository<Review>,
//   ) {}

//   findAll(): Promise<Review[]> {
//     return this.reviewRepo.find({ relations: ['product'] });
//   }

//   async findOne(id: number): Promise<Review> {
//     const review = await this.reviewRepo.findOne({
//       where: { id },
//       relations: ['product'],
//     });

//     if (!review) {
//       throw new NotFoundException(`Review with id ${id} not found`);
//     }

//     return review;
//   }

//   async create(data: Partial<Review>): Promise<Review> {
//     const review = this.reviewRepo.create(data);
//     return this.reviewRepo.save(review);
//   }
// }








import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepo: Repository<Review>,
  ) {}

  findByProduct(productId: number) {
    return this.reviewRepo.find({ where: { product: { id: productId } } });
  }
}
