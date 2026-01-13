import { Module } from '@nestjs/common';
import { ViewHistoryController } from './view-history.controller';
import { ViewHistoryService } from './view-history.service';

@Module({
  controllers: [ViewHistoryController],
  providers: [ViewHistoryService]
})
export class ViewHistoryModule {}
