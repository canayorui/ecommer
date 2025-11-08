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

  @IsNotEmpty({ message: ' el nombre del producto es requerido' })
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name!: string;

  @IsNotEmpty({ message: ' la descripcion del producto es requerida' })
  @IsString()
  @MinLength(10)
  @MaxLength(200)
  description!: string;

  @IsNotEmpty({ message: ' el precio del producto es requerido' })
  @IsNumber()
  price!: number;

  @IsNotEmpty({ message: ' el stock del producto es requerido' })
  @IsNumber()
  stock!: number;
}
