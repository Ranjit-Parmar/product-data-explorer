import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ScrapeJobStatus, ScrapeTargetType } from "./scrape-job.types";

@Entity()
export class ScrapeJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetUrl: string;

  @Column({
    type: 'enum',
    enum: ScrapeTargetType,
  })
  targetType: ScrapeTargetType;

  @Column({
    type: 'enum',
    enum: ScrapeJobStatus,
    default: ScrapeJobStatus.PENDING,
  })
  status: ScrapeJobStatus;

  @Column({ type: 'text', nullable: true })
  errorLog?: string | null;

  @Column({ type: 'int', default: 0 })
  attempts: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'jsonb', nullable: true })
  meta?: Record<string, any>;
}
