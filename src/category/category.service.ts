// // src/category/category.service.ts
// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Category } from './category.entity';
// import { Navigation } from '../navigation/navigation.entity';

import { Injectable } from "@nestjs/common";

// @Injectable()
// export class CategoryService {
//   constructor(
//     @InjectRepository(Category)
//     private categoryRepo: Repository<Category>,
//     @InjectRepository(Navigation)
//     private navigationRepo: Repository<Navigation>,
//   ) {}

//   // ✅ Create category
//   async create(navigationId: number, body: { title: string; slug: string }) {
//     const navigation = await this.navigationRepo.findOne({ where: { id: navigationId } });
//     if (!navigation) throw new Error('Navigation not found');

//     const category = this.categoryRepo.create({ ...body, navigation });
//     return this.categoryRepo.save(category);
//   }

//   // ✅ Get categories by navigation
//   async findByNavigation(navigationId: number) {
//     return this.categoryRepo.find({
//       where: { navigation: { id: navigationId } },
//       relations: ['products'],
//     });
//   }

//   // ✅ Refresh categories (stub for now, implement scraping later)
//   async refresh(navigationId: number) {
//     // Example response for testing
//     return {
//       message: `Refresh triggered for categories under navigation ${navigationId}`,
//     };
//   }
// }




@Injectable()
export class CategoryService {
  private categories = [
    { id: 1, title: 'Fiction', slug: 'fiction', navigationId: 1, parentId: null },
    { id: 2, title: 'Fantasy', slug: 'fantasy', navigationId: 1, parentId: 1 },
    { id: 3, title: 'Adventure', slug: 'adventure', navigationId: 1, parentId: 1 },
  ];

  findByNavigation(navigationId: number) {
    return this.categories.filter(c => c.navigationId === navigationId && c.parentId === null);
  }

  findChildren(parentId: number) {
    return this.categories.filter(c => c.parentId === parentId);
  }

  findOne(slug: string) {
    return this.categories.find(c => c.slug === slug);
  }

  findAll(){
    return this.categories
  }

  refresh(navigationId: number) {
    return {
      message: `Refresh triggered for categories under navigation ${navigationId}`,
    };
  }
}
