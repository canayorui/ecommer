import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { Orders } from '../entities/orders.entity';

export class CreateUserDto {
  id!: string;
  orders!: Orders[];

  @IsNotEmpty({ message: 'el nombre es requerido' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name!: string;

  @IsNotEmpty({ message: 'el email es requerido' })
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: 'la contraseña es requerida' })
  @IsString()
  
  password!: string;
  phone!: number;
  country!: string;
  address!: string;
  city!: string;
}
