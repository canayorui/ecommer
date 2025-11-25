import { ApiProperty } from '@nestjs/swagger';
import { Orders } from 'src/entities/orders.entity';
import { Product } from 'src/entities/products.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_details',
})
export class OrderDetails {
  @ApiProperty({ description: 'uuid v4 generada por la base de datos' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'precio total de los detalles de la orden' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @OneToOne(() => Orders, (order) => order.orderDetails)
  @JoinColumn({ name: 'order_id' })
  order!: Orders;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'order_details_id',
      referencedColumnName: 'id',
    },
  })
  products!: Product[];
}
