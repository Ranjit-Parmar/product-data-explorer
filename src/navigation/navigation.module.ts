import { Module } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { NavigationController } from './navigation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Navigation } from './navigation.entity';
import { Category } from 'src/category/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Navigation, Category])],
  providers: [NavigationService],
  controllers: [NavigationController]
})
export class NavigationModule {}
