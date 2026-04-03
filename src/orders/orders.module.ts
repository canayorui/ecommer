import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/orders/entities/order.entity';
import { OrderDetails } from 'src/orders/entities/order-detail.entity';
import { Users } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { OrdersRepository } from './orders.repository';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, OrderDetails, Users, Product]),
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
})
export class OrdersModule {}
