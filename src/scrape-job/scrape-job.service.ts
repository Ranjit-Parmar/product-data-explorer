import { Injectable } from "@nestjs/common";

@Injectable()
export class ScrapeJobService {
  private jobs = [
    { id: 1, targetUrl: 'https://example.com', targetType: 'navigation', status: 'completed' },
  ];

  findAll() { return this.jobs; }
  findOne(id: number) { return this.jobs.find(j => j.id === id); }
  refresh(){
    return {"message": "this is refresh scrape job endpoint"}
  }
}