// import { Controller, Post, Body, Get, Query } from '@nestjs/common';
// import { ViewHistoryService } from './view-history.service';

// @Controller('view-history')
// export class ViewHistoryController {
//   constructor(private historyService: ViewHistoryService) {}

//   @Post()
//   create(@Body() body: { userId?: number; sessionId: string; pathJson: any }) {
//     return this.historyService.create(body.userId, body.sessionId, body.pathJson);
//   }

//   @Get()
//   find(@Query('sessionId') sessionId: string) {
//     return this.historyService.findBySession(sessionId);
//   }
// }








import { Controller, Get, Post, Body } from '@nestjs/common';
import { ViewHistoryService } from './view-history.service';

@Controller('view-history')
export class ViewHistoryController {
  constructor(private readonly historyService: ViewHistoryService) {}

  @Post()
  create(@Body() body: any) {
    return this.historyService.create(body);
  }

  @Get()
  getAll() {
    return this.historyService.findAll();
  }
}
