import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('view_history')
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  sessionId: string;

  @Column('jsonb')
  pathJson: string[];

  @CreateDateColumn()
  createdAt: Date;
}
