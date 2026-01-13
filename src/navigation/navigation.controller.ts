// // src/navigation/navigation.controller.ts
// import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// import { NavigationService } from './navigation.service';

import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { NavigationService } from "./navigation.service";

// @Controller('navigation')
// export class NavigationController {
//   constructor(private readonly navigationService: NavigationService) {}

//   @Get()
//   getAll() {
//     return this.navigationService.findAll();
//   }

//   @Get(':id')
//   getOne(@Param('id') id: number) {
//     return this.navigationService.findOne(+id);
//   }

//   @Post()
//   create(@Body() body: { title: string; slug: string }) {
//     return this.navigationService.create(body.title, body.slug);
//   }

//   @Post('refresh')
//   refresh(){
//     return this.navigationService.refresh();
//   }
// }










@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get()
  getAll() {
    return this.navigationService.findAll();
  }

  @Get(':slug')
  getOne(@Param('slug') slug: string) {
    return this.navigationService.findOne(slug);
  }

  @Post()
  create(@Body() body: any){
    return this.navigationService.create(body)
  }

  @Post('refresh')
  refresh(){
    return {"message": "this is refresh endpoint for navigation"}
  }
}

