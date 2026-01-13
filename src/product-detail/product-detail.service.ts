import { Injectable } from "@nestjs/common";

@Injectable()
export class ProductDetailService {
  private details = [
    { productId: 1, description: 'Magic book', specs: { ISBN: '123' }, ratingsAvg: 4.5, reviewsCount: 12 },
    { productId: 2, description: 'Adventure story', specs: { ISBN: '456' }, ratingsAvg: 4.2, reviewsCount: 8 },
  ];

  findOne(productId: number) {
    return this.details.find(d => d.productId === productId);
  }

  refreshProductDetail(id: number){
    return {"message": "this is refresh product detail for id "+ id}
  }
}