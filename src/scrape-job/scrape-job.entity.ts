import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('scrape_job')
export class ScrapeJob {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  targetUrl: string;

  @Column()
  targetType: string;

  @Column()
  status: string;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date;

  @Column({ type: 'text', nullable: true })
  errorLog: string;
}
