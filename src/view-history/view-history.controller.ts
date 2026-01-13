import { Body, Controller, Get, Post } from "@nestjs/common";
import { ViewHistoryService } from "./view-history.service";

@Controller('view-history')
export class ViewHistoryController {
  constructor(private readonly viewService: ViewHistoryService) {}

  @Get()
  getAll() { return this.viewService.findAll(); }

  @Post()
  create(@Body() body: any) { return this.viewService.create(body); }
}