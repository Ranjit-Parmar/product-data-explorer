import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, LessThan, Repository } from 'typeorm';

import { ScrapeJob } from './scrape-job.entity';
import { ScrapeJobStatus, ScraperJobMeta, ScrapeTargetType } from './scrape-job.types';

@Injectable()
export class ScrapeJobService {
  private readonly logger = new Logger(ScrapeJobService.name);

  private readonly MAX_ATTEMPTS = 3;
  private readonly RUNNING_TIMEOUT_MINUTES = 15;

  constructor(
    @InjectRepository(ScrapeJob)
    private readonly scrapeJobRepo: Repository<ScrapeJob>,
  ) {}

  /**
   * Enqueue a scrape job if not already pending/running
   */
 async enqueue(params: {
  targetUrl: string;
  targetType: ScrapeTargetType;
  meta?: ScraperJobMeta;
}): Promise<ScrapeJob> {
  const targetUrl = params.targetUrl.trim().toLowerCase();

  const existingJob = await this.scrapeJobRepo.findOne({
    where: {
      targetUrl,
      targetType: params.targetType,
      status: In([ScrapeJobStatus.PENDING, ScrapeJobStatus.RUNNING]),
    },
  });

  if (existingJob) {
    this.logger.log(
      `Duplicate scrape job prevented: ${params.targetType} → ${targetUrl}`,
    );
    return existingJob;
  }

  const job = this.scrapeJobRepo.create({
    targetUrl,
    targetType: params.targetType,
    status: ScrapeJobStatus.PENDING,
    meta: params.meta ?? {},
  });

  return this.scrapeJobRepo.save(job);
}



  /**
   * Atomically fetch & lock the next pending job (FIFO)
   * Safe for parallel workers
   */
  async getNextPendingJob(): Promise<ScrapeJob | null> {
    return this.scrapeJobRepo.manager.transaction(async (manager) => {
      const job = await manager.findOne(ScrapeJob, {
        where: {
          status: ScrapeJobStatus.PENDING,
          attempts: LessThan(this.MAX_ATTEMPTS),
        },
        order: { createdAt: 'ASC' },
        lock: { mode: 'pessimistic_write' },
      });

      if (!job) return null;

      job.status = ScrapeJobStatus.RUNNING;
      job.attempts += 1;

      await manager.save(job);
      return job;
    });
  }

  /**
   * Mark job as DONE
   */
  async markDone(job: ScrapeJob): Promise<void> {
    job.status = ScrapeJobStatus.DONE;
    job.errorLog = null;
    await this.scrapeJobRepo.save(job);
  }

  /**
   * Mark job as FAILED or RETRY
   */
  async markFailed(job: ScrapeJob, error: unknown): Promise<void> {
    const errorLog =
      error instanceof Error
        ? `${error.message}\n${error.stack}`
        : JSON.stringify(error);

    job.errorLog = errorLog;

    if (job.attempts >= this.MAX_ATTEMPTS) {
      job.status = ScrapeJobStatus.FAILED;
      this.logger.error(
        `Scrape job permanently failed [${job.id}]`,
        errorLog,
      );
    } else {
      job.status = ScrapeJobStatus.PENDING;
      this.logger.warn(
        `Scrape job retrying (${job.attempts}/${this.MAX_ATTEMPTS}) [${job.id}]`,
      );
    }

    await this.scrapeJobRepo.save(job);
  }

  /**
   * Recover jobs stuck in RUNNING state (worker crash safety)
   * Call via cron or app bootstrap
   */
  async recoverStuckJobs(): Promise<void> {
    const timeoutDate = new Date(
      Date.now() - this.RUNNING_TIMEOUT_MINUTES * 60 * 1000,
    );

    const stuckJobs = await this.scrapeJobRepo.find({
      where: {
        status: ScrapeJobStatus.RUNNING,
        updatedAt: LessThan(timeoutDate),
      },
    });

    if (!stuckJobs.length) return;

    for (const job of stuckJobs) {
      job.status = ScrapeJobStatus.PENDING;
      await this.scrapeJobRepo.save(job);
    }

    this.logger.warn(`Recovered ${stuckJobs.length} stuck scrape jobs`);
  }
}
