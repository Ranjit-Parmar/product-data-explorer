import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { ScrapeJobService } from '../scrape-job/scrape-job.service';
import { ScrapeTargetType } from '../scrape-job/scrape-job.types';

@Controller('navigation')
export class NavigationController {
  constructor(
    private readonly navService: NavigationService,
    private readonly scrapeJobService: ScrapeJobService,
  ) {}

  @Get()
  getAll() {
    return this.navService.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.navService.findOne(+id);
  }

  @Post('scrape')
  async scrapeNavigation(@Body() body: { url: string }) {
    const job = await this.scrapeJobService.enqueue({
      targetUrl: body.url,
      targetType: ScrapeTargetType.NAVIGATION,
    });
    return job;
  }
}
