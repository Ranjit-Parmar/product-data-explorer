import { Product } from '../product/product.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from 'typeorm';


@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productId: number;

  @Column()
  author: string;

  @Column('decimal')
  rating: number;

  @Column('text')
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Product, product => product.reviews, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'productId' })
  product: Product;
}
