import { Injectable } from "@nestjs/common";

@Injectable()
export class ReviewService {
  private reviews = [
    { id: 1, productId: 1, author: 'John', rating: 5, text: 'Great book' },
    { id: 2, productId: 1, author: 'Jane', rating: 4, text: 'Good read' },
  ];

  findByProduct(productId: number) {
    return this.reviews.filter(r => r.productId === productId);
  }
}