// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ViewHistory } from './view-history.entity';
// import { ViewHistoryService } from './view-history.service';
// import { ViewHistoryController } from './view-history.controller';

// @Module({
//   imports: [TypeOrmModule.forFeature([ViewHistory])],
//   providers: [ViewHistoryService],
//   controllers: [ViewHistoryController],
//   exports: [ViewHistoryService],
// })
// export class ViewHistoryModule {}










import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViewHistory } from './view-history.entity';
import { ViewHistoryService } from './view-history.service';
import { ViewHistoryController } from './view-history.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViewHistory])],
  providers: [ViewHistoryService],
  controllers: [ViewHistoryController],
  exports: [ViewHistoryService],
})
export class ViewHistoryModule {}

