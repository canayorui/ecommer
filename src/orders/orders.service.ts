import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';

@Injectable()
export class OrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  async addOrder(userId: string, products: any) {
    return await this.ordersRepository.addOrder(userId, products);
  }

  async getOrder(id: string) {
    return await this.ordersRepository.getOrder(id);
  }
}
