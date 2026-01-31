import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Navigation } from '../navigation/navigation.entity';
import { Product } from '../product/product.entity';

@Entity()
@Index(['slug', 'navigation'], { unique: true }) // ⭐ IMPORTANT
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Navigation, nav => nav.categories, { nullable: false })
  navigation: Navigation;

  @ManyToOne(() => Category, cat => cat.children, { nullable: true })
  parent?: Category | null;

  @OneToMany(() => Category, cat => cat.parent)
  children: Category[];

  @OneToMany(() => Product, prod => prod.category)
  products: Product[];

  @Column()
  title: string;

  @Column()
  slug: string;

  @Column({ default: 0 })
  productCount: number;

  @Column({ type: 'timestamptz', nullable: true })
  lastScrapedAt: Date;
}
