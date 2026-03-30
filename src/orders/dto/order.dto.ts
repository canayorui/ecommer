import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateOrderDto {
  @ApiProperty({ description: 'ID del usuario que realiza el pedido' })
  @IsNotEmpty({ message: 'el id de usuario es requerido' })
  @IsUUID()
  userId!: string;

  /***
   * Debe ser un array de ids de productos
   * @example [{ "id": "uuid-del-producto-1" }
   */
  @IsNotEmpty({ message: 'los ids de producto son requeridos' })
  @IsArray()
  @ArrayMinSize(1, { message: 'debe haber al menos un producto en el pedido' })
  products!: Partial<Product>[];
}
