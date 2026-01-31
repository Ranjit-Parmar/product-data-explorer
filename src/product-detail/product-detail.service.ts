// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ProductDetail } from './product-detail.entity';

// @Injectable()
// export class ProductDetailService {
//   constructor(
//     @InjectRepository(ProductDetail)
//     private detailRepo: Repository<ProductDetail>,
//   ) {}

//   findAll(): Promise<ProductDetail[]> {
//     return this.detailRepo.find({ relations: ['product'] });
//   }

//   async findOne(id: number): Promise<ProductDetail> {
//     const detail = await this.detailRepo.findOne({
//       where: { id },
//       relations: ['product'],
//     });

//     if (!detail) {
//       throw new NotFoundException(`ProductDetail with id ${id} not found`);
//     }

//     return detail;
//   }

//   async create(data: Partial<ProductDetail>): Promise<ProductDetail> {
//     const detail = this.detailRepo.create(data);
//     return this.detailRepo.save(detail);
//   }
// }

















import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDetail } from './product-detail.entity';

@Injectable()
export class ProductDetailService {
  constructor(
    @InjectRepository(ProductDetail)
    private readonly detailRepo: Repository<ProductDetail>,
  ) {}

  findOne(productId: number) {
    return this.detailRepo.findOne({ where: { product: { id: productId } } });
  }
}
