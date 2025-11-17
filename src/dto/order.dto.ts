import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/entities/products.entity';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'el id de usuario es requerido' })
  @IsUUID()
  userId!: string;

  @IsNotEmpty({ message: 'los ids de producto son requeridos' })
  @IsArray()
  @ArrayMinSize(1, { message: 'debe haber al menos un producto en el pedido' })
  products!: Partial<Product>[];
}
