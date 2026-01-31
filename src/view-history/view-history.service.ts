// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { ViewHistory } from './view-history.entity';

// @Injectable()
// export class ViewHistoryService {
//   constructor(
//     @InjectRepository(ViewHistory)
//     private viewHistoryRepo: Repository<ViewHistory>,
//   ) {}

//   create(userId: number | undefined, sessionId: string, pathJson: any) {
//     const view = this.viewHistoryRepo.create({ userId, sessionId, pathJson });
//     return this.viewHistoryRepo.save(view);
//   }

//   findBySession(sessionId: string) {
//     return this.viewHistoryRepo.find({ where: { sessionId } });
//   }
// }









import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViewHistory } from './view-history.entity';

@Injectable()
export class ViewHistoryService {
  constructor(
    @InjectRepository(ViewHistory)
    private readonly historyRepo: Repository<ViewHistory>,
  ) {}

  create(history: Partial<ViewHistory>) {
    return this.historyRepo.save(history);
  }

  findAll() {
    return this.historyRepo.find();
  }
}

