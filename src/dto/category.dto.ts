import { IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateCategoryDto {
  id!: string;
  products!: Product[];

  @IsNotEmpty({ message: 'El nombre de la categoría es requerido' })
  @IsString()
  name!: string;
}
