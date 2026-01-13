// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Product } from './product.entity';

import { Injectable } from "@nestjs/common";

// @Injectable()
// export class ProductService {
//   constructor(
//     @InjectRepository(Product)
//     private repo: Repository<Product>,
//   ) {}

//   findByCategory(categoryId: number, limit: number, page: number) {
//     return this.repo.find({
//       where: { category: { id: categoryId } },
//       take: limit,
//       skip: (page - 1) * limit,
//     });
//   }

//   findOne(id: number) {
//     return this.repo.findOne({
//       where: { id },
//       relations: ['detail', 'reviews'],
//     });
//   }

//   refreshCategory(categoryId: number) {
//     return { message: `Refresh products for category ${categoryId}` };
//   }

//   refreshProduct(productId: number) {
//     return { message: `Refresh product ${productId}` };
//   }
// }






@Injectable()
export class ProductService {
  private products = [
    { id: 1, title: 'Harry Potter', price: 5.99, currency: 'GBP', categoryId: 2, sourceId: 'HP1', sourceUrl: 'https://example.com/hp1', imageUrl: '' },
    { id: 2, title: 'Hobbit', price: 4.99, currency: 'GBP', categoryId: 3, sourceId: 'HOB1', sourceUrl: 'https://example.com/hobbit', imageUrl: '' },
  ];

  findByCategory(categoryId: number) {
    return this.products.filter(p => p.categoryId === categoryId);
  }

  findOne(id: number) {
    return this.products.find(p => p.id === id);
  }

    refreshProduct(productId: number) {
    return { message: `Refresh product ${productId}` };
  }
}
