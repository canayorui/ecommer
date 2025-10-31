import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  JoinColumn,
} from 'typeorm';
import { Category } from 'src/entities/categories.entity';
import { OrderDetails } from 'src/entities/ordersdetails.entity';

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
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

  @OneToMany(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category!: Category[];

  @ManyToMany(() => OrderDetails, (orderDetails) => orderDetails.products)
  orderDetails!: OrderDetails[];
}
