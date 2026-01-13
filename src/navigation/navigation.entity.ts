import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity('navigation')
export class Navigation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ type: 'timestamp', nullable: true })
  lastScrapedAt: Date;

  @OneToMany(() => Category, category => category.navigation)
  categories: Category[];
}
