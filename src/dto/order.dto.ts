import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsUUID()
  @IsString()
  @IsNotEmpty({ message: 'el id del pedido es requerido' })
  id!: string;

  @IsNotEmpty({ message: 'la fecha es requerida' })
  @IsDate()
  date!: Date;

  @IsNotEmpty({ message: 'el id de usuario es requerido' })
  @IsUUID()
  userId!: string;

  @IsNotEmpty({ message: 'los ids de producto son requeridos' })
  @IsArray()
  @ArrayMinSize(1, { message: 'debe haber al menos un producto en el pedido' })
  products!: Partial<Product>[];
}
