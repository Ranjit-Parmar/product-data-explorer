import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { Category } from '../category/category.entity';
import { ProductDetail } from '../product-detail/product-detail.entity';
import { Review } from '../review/review.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  sourceId: string;

  @Column()
  title: string;

  @Column('decimal')
  price: number;

  @Column()
  currency: string;

  @Column({ type: 'text', nullable: true })
  imageUrl?: string | null;

  @Column({ unique: true })
  sourceUrl: string;

  @Column({ type: 'timestamptz', nullable: true })
  lastScrapedAt: Date;

  @ManyToOne(() => Category, cat => cat.products, { nullable: false })
  category: Category;

  @OneToOne(() => ProductDetail, detail => detail.product, { cascade: true })
  @JoinColumn()
  detail: ProductDetail;

  @OneToMany(() => Review, review => review.product, { cascade: true })
  reviews: Review[];
}
