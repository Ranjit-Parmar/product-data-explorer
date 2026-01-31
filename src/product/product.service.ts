// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';
// import { ProductDetail } from '../product-detail/product-detail.entity';
// import { Review } from '../review/review.entity';

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectRepository(Product) private productRepo: Repository<Product>,
//     @InjectRepository(ProductDetail) private detailRepo: Repository<ProductDetail>,
//     @InjectRepository(Review) private reviewRepo: Repository<Review>,
//   ) {}

//   findAll(): Promise<Product[]> {
//     return this.productRepo.find({ relations: ['category', 'detail', 'reviews'] });
//   }

//   findOne(id: number): Promise<Product | null> {
//     return this.productRepo.findOne({ where: { id }, relations: ['category', 'detail', 'reviews'] });
//   }

//   async create(data: {
//     title: string;
//     sourceId: string;
//     price: number;
//     currency: string;
//     imageUrl: string;
//     sourceUrl: string;
//     lastScrapedAt?: Date;
//     category: { id: number };
//     detail?: Partial<ProductDetail>;
//     reviews?: Partial<Review>[];
//   }): Promise<Product> {
//     const product = this.productRepo.create({
//       ...data,
//       detail: data.detail ? this.detailRepo.create(data.detail) : undefined,
//       reviews: data.reviews ? data.reviews.map(r => this.reviewRepo.create(r)) : [],
//     });

//     return this.productRepo.save(product);
//   }
// }








import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  findAll() {
    return this.productRepo.find({ relations: ['category', 'detail', 'reviews'] });
  }

  findByCategory(catId: number) {
    return this.productRepo.find({ where: { category: { id: catId } }, relations: ['detail', 'reviews'] });
  }

  findOne(id: number) {
    return this.productRepo.findOne({ where: { id }, relations: ['detail', 'reviews'] });
  }
}
