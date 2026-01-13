// // src/category/category.controller.ts
// import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// import { CategoryService } from './category.service';

import { Controller, Get, Param, Post } from "@nestjs/common";
import { CategoryService } from "./category.service";

// @Controller('navigation/:navigationId/categories')
// export class CategoryController {
//   constructor(private readonly categoryService: CategoryService) {}

//   // ✅ GET categories by navigation
//   @Get()
//   findByNavigation(@Param('navigationId') navigationId: string) {
//     return this.categoryService.findByNavigation(Number(navigationId));
//   }

//   // ✅ POST create category under a navigation
//   @Post()
//   create(
//     @Param('navigationId') navigationId: string,
//     @Body() body: { title: string; slug: string },
//   ) {
//     return this.categoryService.create(Number(navigationId), body);
//   }

//   // ✅ POST refresh categories under a navigation
//   @Post('/refresh')
//   refresh(@Param('navigationId') navigationId: string) {
//     return this.categoryService.refresh(Number(navigationId));
//   }
// }

















@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('navigation/:navigationId')
  getCategoriesByNavigation(@Param('navigationId') navigationId: number) {
    return this.categoryService.findByNavigation(+navigationId);
  }

  @Get(':slug')
  getCategory(@Param('slug') slug: string) {
    const category = this.categoryService.findOne(slug);
    if (!category) return { error: 'Category not found' };
    category['children'] = this.categoryService.findChildren(category.id);
    return category;
  }

  @Get()
  findAll(){
    return this.categoryService.findAll()
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string){
    return this.categoryService.findOne(slug)
  }

  @Post('/:navigationId/refresh')
  refresh(@Param('navigationId') navigationId: string) {
    return this.categoryService.refresh(Number(navigationId));
  }
}

