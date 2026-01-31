// import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
// import { CategoryService } from './category.service';

// @Controller('category')
// export class CategoryController {
//   constructor(private catService: CategoryService) {}

//   @Get()
//   findAll() {
//     return this.catService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id', ParseIntPipe) id: number) {
//     return this.catService.findOne(id);
//   }

//   @Post()
//   create(@Body() body: { title: string; slug: string; navigationId: number; parentId?: number }) {
//     return this.catService.create(body.title, body.slug, body.navigationId, body.parentId);
//   }
// }









import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}

  @Get()
  getAll() {
    return this.catService.findAll();
  }

  @Get('navigation/:navId')
  getByNavigation(@Param('navId') navId: string) {
    return this.catService.findByNavigation(+navId);
  }
}
