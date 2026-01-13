import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { ProductDetail } from '../product-detail/product-detail.entity';
import { Review } from '../review/review.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sourceId: string;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column({ default: 'GBP' })
  currency: string;

  @Column()
  imageUrl: string;

  @Column()
  sourceUrl: string;

  @Column({ type: 'timestamp', nullable: true })
  lastScrapedAt: Date;

  @ManyToOne(() => Category, category => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @Column()
  categoryId: number;

  @OneToMany(() => Review, review => review.product)
  reviews: Review[];

  @OneToOne(() => ProductDetail, detail => detail.product, { cascade: true })
  detail: ProductDetail;
}
