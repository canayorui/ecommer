import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/order.dto';
import { AuthGuard } from 'src/auth/guards/auth.guards';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  // Post http://localhost:3000/orders
  @Post()
  @UseGuards(AuthGuard)
  addOrder(@Body() order: CreateOrderDto) {
    const { userId, products } = order;
    if (!userId || !products || products.length === 0) {
      throw new Error('orden inválida');
    }

    return this.ordersService.addOrder(userId, products);
  }

  // Get http://localhost:3000/orders/:id
  @Get(':id')
  @UseGuards(AuthGuard)
  getOrder(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.getOrder(id);
  }
}
