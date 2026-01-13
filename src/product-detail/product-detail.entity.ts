import { Entity, Column, OneToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity('product_detail')
export class ProductDetail {
  @PrimaryColumn()
  productId: number;

  @OneToOne(() => Product, product => product.detail)
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'jsonb', nullable: true })
  specs: Record<string, any>;

  @Column({ type: 'float', nullable: true })
  ratingsAvg: number;

  @Column({ nullable: true })
  reviewsCount: number;
}
