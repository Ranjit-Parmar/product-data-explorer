// // src/navigation/navigation.service.ts
// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Navigation } from './navigation.entity';

import { Injectable } from "@nestjs/common";
import { scrapeNavigation } from "src/scraper/navigation.scraper";

// @Injectable()
// export class NavigationService {
//   constructor(
//     @InjectRepository(Navigation)
//     private navigationRepo: Repository<Navigation>,
//   ) {}

//   findAll(): Promise<Navigation[]> {
//     return this.navigationRepo.find({ relations: ['categories'] });
//   }

//   async findOne(id: number): Promise<Navigation> {
//   const nav = await this.navigationRepo.findOne({ where: { id }, relations: ['categories'] });
//   if (!nav) throw new NotFoundException(`Navigation with id ${id} not found`);
//   return nav;
// }

//   create(title: string, slug: string): Promise<Navigation> {
//     const nav = this.navigationRepo.create({ title, slug });
//     return this.navigationRepo.save(nav);
//   }

//   async refresh() {
//     return { message: 'Navigation refresh triggered (scraping later)' };
//   }
// }






@Injectable()
export class NavigationService {
  private navigations = [
    { id: 1, title: 'Books', slug: 'books', lastScrapedAt: new Date() },
    { id: 2, title: 'Children', slug: 'children', lastScrapedAt: new Date() },
  ];

  findAll() {
    return this.navigations;
  }

  findOne(slug: string) {
    return this.navigations.find(nav => nav.slug === slug);
  }

  create(navigation: any) {
    const newNavigation = {id: this.navigations.length + 1, lastScrapedAt: new Date(), ...navigation};
    this.navigations.push(newNavigation);

    return newNavigation;
  }

  // async refresh(refresh: string){
  //   // 1. Create scrape job
  // const job = await this.scrapeJobRepo.save({
  //   type: 'NAVIGATION',
  //   status: 'RUNNING',
  // });

  // try {
  //   // 2. Scrape
  //   const data = await scrapeNavigation();

  //   // 3. Save to DB
  //   for (const item of data) {
  //     await this.navigationRepo.upsert(
  //       { title: item.title, slug: item.slug },
  //       ['slug'],
  //     );
  //   }

  //   // 4. Mark job success
  //   job.status = 'COMPLETED';
  //   await this.scrapeJobRepo.save(job);
  // } catch (err) {
  //   job.status = 'FAILED';
  //   job.error = err.message;
  //   await this.scrapeJobRepo.save(job);
  // }
  // }
  
}
