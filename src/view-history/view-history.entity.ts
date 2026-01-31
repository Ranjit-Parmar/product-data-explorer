import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ViewHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  userId: number;

  @Column()
  sessionId: string;

  @Column({ type: 'jsonb' })
  pathJson: any;

  @CreateDateColumn()
  createdAt: Date;
}
