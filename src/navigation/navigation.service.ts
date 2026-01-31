import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Navigation } from './navigation.entity';

@Injectable()
export class NavigationService {
  constructor(
    @InjectRepository(Navigation)
    private readonly navRepo: Repository<Navigation>,
  ) {}

  findAll() {
    return this.navRepo.find({ relations: ['categories'] });
  }

  findOne(id: number) {
    return this.navRepo.findOne({ where: { id }, relations: ['categories'] });
  }

  create(nav: Partial<Navigation>) {
    return this.navRepo.save(nav);
  }
}
