import { ApiProperty } from '@nestjs/swagger';
import { OrderDetails } from 'src/orders/entities/order-detail.entity';
import { Users } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Orders {
  @ApiProperty({ description: 'uuid v4 generada por la base de datos' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'fecha y hora en que se realizó la orden' })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  date!: Date;

  @OneToOne(() => OrderDetails, (orderDetails) => orderDetails.order)
  orderDetails!: OrderDetails;

  @ManyToOne(() => Users, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user!: Users;
}
