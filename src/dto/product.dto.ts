import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsNumber,
} from 'class-validator';
import { Category } from 'src/entities/categories.entity';
import { OrderDetails } from 'src/entities/ordersdetails.entity';

export class CreateProductDto {
  id!: string;
  category!: Category;
  orderDetails!: OrderDetails[];

  /***
   * Debe ser un string de entre 3 a 50 caracteres
   * @example 'MAUSE'
   */
  @IsNotEmpty({ message: ' el nombre del producto es requerido' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  /***
   * Debe ser un string de entre 10 a 200 caracteres
   * @example ''
   */
  @IsNotEmpty({ message: ' la descripcion del producto es requerida' })
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description!: string;

  /***
   * Debe ser un numero
   * @example 100
   */
  @IsNotEmpty({ message: ' el precio del producto es requerido' })
  @IsNumber()
  price!: number;

  /***
   * Debe ser un numero
   * @example 100
   */
  @IsNotEmpty({ message: ' el stock del producto es requerido' })
  @IsNumber()
  stock!: number;
}
