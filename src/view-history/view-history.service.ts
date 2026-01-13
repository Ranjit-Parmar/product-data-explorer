import { Injectable } from "@nestjs/common";

@Injectable()
export class ViewHistoryService {
  private history = [
    { id: 1, sessionId: 'abc123', pathJson: ['/navigation/books','/categories/fiction'], createdAt: new Date() },
  ];

  findAll() { return this.history; }
  create(view: any) { 
    const newView = { id: this.history.length + 1, createdAt: new Date(), ...view };
    this.history.push(newView);
    return newView;
  }
}