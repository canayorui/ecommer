import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from 'src/entities/products.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'category',
})
export class Category {
  @ApiProperty({ description: 'uuid v4 generada por la base de datos' })
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ApiProperty({ description: 'nombre de la categoría' })
  @Column({ type: 'varchar', length: 50, nullable: false })
  name!: string;

  @OneToMany(() => Product, (product) => product.category)
  products!: Product[];
}
