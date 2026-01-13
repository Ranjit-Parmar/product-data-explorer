import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Navigation } from '../navigation/navigation.entity';
import { Product } from '../product/product.entity';

@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ nullable: true })
  productCount: number;

  @Column({ type: 'timestamp', nullable: true })
  lastScrapedAt: Date;

  @ManyToOne(() => Navigation, navigation => navigation.categories)
  navigation: Navigation;

  @Column()
  navigationId: number;

  @OneToMany(() => Category, category => category.parent)
  children: Category[];

  @ManyToOne(() => Category, category => category.children, { nullable: true })
  parent: Category;

  @OneToMany(() => Product, product => product.category)
  products: Product[];
}
