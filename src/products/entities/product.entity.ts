import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetails } from 'src/orders/entities/order-detail.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name!: string;

  @Column({ type: 'varchar', nullable: false })
  description!: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price!: number;

  @Column({ type: 'int', nullable: false })
  stock!: number;

  @Column({
    type: 'text',
    default:
      'https://wallpapers.com/images/featured/imagenes-geniales-fz4qiypiy3ob4vix.jpg',
  })
  imgUrl!: string;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category!: Category | undefined;

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails!: OrderDetails[];
}
