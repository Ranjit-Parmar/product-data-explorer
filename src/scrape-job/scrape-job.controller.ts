import { Controller, Get, Param, Post } from "@nestjs/common";
import { ScrapeJobService } from "./scrape-job.service";

@Controller('scrape-jobs')
export class ScrapeJobController {
  constructor(private readonly jobService: ScrapeJobService) {}

  @Get()
  findAll() { return this.jobService.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: number) { return this.jobService.findOne(+id); }

  @Post('refresh')
  refreshScrapeJob(){
   return this.jobService.refresh()
  }
}
