import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  description: string;

  @Column('json', { nullable: true })
  specs: Record<string, any>;

  @Column('decimal', { nullable: true })
  ratingsAvg: number;

  @Column({ nullable: true })
  reviewsCount: number;

  @OneToOne(() => Product, product => product.detail)
  product: Product; // inverse side
}
