import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ description: 'uuid v4 generada por la base de datos' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'nombre del usuario' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @ApiProperty({ description: 'email del usuario' })
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  email!: string;

  @ApiProperty({ description: 'contraseña del usuario' })
  @Column({ type: 'varchar', length: 60, nullable: false })
  password!: string;

  @ApiProperty({ description: 'teléfono del usuario' })
  @Column({ type: 'int' })
  phone!: number;

  @ApiProperty({ description: 'país del usuario' })
  @Column({ type: 'varchar', length: 50 })
  country!: string;

  @ApiProperty({ description: 'dirección del usuario' })
  @Column({ type: 'varchar', length: 100 })
  address!: string;

  @ApiProperty({ description: 'ciudad del usuario' })
  @Column({ type: 'varchar', length: 50 })
  city!: string;

  @ApiProperty({ description: 'indica si el usuario es administrador' })
  @Column({ default: false })
  isAdmin!: boolean;
  //una relacion uno a muchos con orders
  @OneToMany(() => Orders, (order) => order.user)
  @JoinColumn({ name: 'order_id' })
  orders!: Orders[];
}
