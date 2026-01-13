import { Test, TestingModule } from '@nestjs/testing';
import { ScrapeJobController } from './scrape-job.controller';

describe('ScrapeJobController', () => {
  let controller: ScrapeJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScrapeJobController],
    }).compile();

    controller = module.get<ScrapeJobController>(ScrapeJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
