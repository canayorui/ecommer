import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Orders } from '../entities/orders.entity';

// DTO para crear usuario
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
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'la contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y uno de los caracteres especiales: !@#$%^&*',
    },
  )
  password!: string;

  @IsNotEmpty({ message: 'el número de teléfono es requerido' })
  @IsNumber()
  phone!: number;

  @IsNotEmpty({ message: 'el país es requerido' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country!: string;

  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address!: string;

  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city!: string;
}

// DTO para actualizar usuario
export class UpdateUserDto {
  id!: string;
  orders!: Orders[];

  @IsString()
  @IsOptional()
  @MaxLength(80)
  name?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password?: string;

  @IsOptional()
  @IsNumber()
  phone?: number;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address?: string;

  @IsOptional()
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city?: string;
}

export class LoginUserDto {
  @IsNotEmpty({ message: 'el email es requerido' })
  @IsString()
  @IsEmail()
  email!: string;

  @IsNotEmpty({ message: 'la contraseña es requerida' })
  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsStrongPassword(
    {
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'la contraseña debe tener al menos una letra mayúscula, una letra minúscula, un número y uno de los caracteres especiales: !@#$%^&*',
    },
  )
  password!: string;
}
