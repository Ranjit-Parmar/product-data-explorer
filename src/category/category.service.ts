import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly catRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.catRepo.find({ relations: ['navigation', 'children'] });
  }

  findByNavigation(navId: number) {
    return this.catRepo.find({ where: { navigation: { id: navId } } });
  }

  create(cat: Partial<Category>) {
    return this.catRepo.save(cat);
  }
}
