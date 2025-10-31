import { Orders } from 'src/entities/orders.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  password!: string;

  @Column({ type: 'int' })
  phone!: number;

  @Column({ type: 'varchar', length: 50 })
  country!: string;

  @Column({ type: 'varchar', length: 100 })
  address!: string;

  @Column({ type: 'varchar', length: 50 })
  city!: string;
  //una relacion uno a muchos con orders
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders!: Orders[];
}
