import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateCategoryDto {
  @ApiProperty({ description: 'ID de la categoría' })
  id!: string;
  /***
   * Debe  ser un array de productos
   */
  products!: Product[];

  /***
   * Debe ser un string
   * @example "Electrónica"
   */
  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  @IsString()
  name!: string;
}
