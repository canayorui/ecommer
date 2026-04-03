import {
  IsArray,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { Orders } from 'src/orders/entities/order.entity';
import { MatchPassword } from 'src/decorators/matchPassword.decorators';
import { ApiHideProperty } from '@nestjs/swagger';
import { Role } from 'src/auth/enums/roles.enum';

export class CreateUserDto {
  @ApiHideProperty()
  id!: string;

  @ApiHideProperty()
  orders!: Orders[];

  /***
   * Debe ser un string de entre 3 a 80 caracteres
   * @example 'Juan Perez'
   */
  @IsNotEmpty({ message: 'el nombre es requerido' })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name!: string;

  /***
   * Debe ser un email valido
   * @example 'test12@example.com'
   */
  @IsNotEmpty({ message: 'el email es requerido' })
  @IsString()
  @IsEmail()
  email!: string;

  /***
   * Debe ser un string de entre 8 a 15 caracteres, debe contener una minuscula,una mayuscula
   * un numero y un simbolo(!@#$%^&*
   * @example 'Abb12pollo@'
   */
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

  /***
   * Debe confirmar la contraseña principal
   */
  @IsNotEmpty({ message: 'la confirmación de la contraseña es requerida' })
  @IsString()
  @Validate(MatchPassword, ['password'])
  confirmPassword!: string;

  /***
   * debe ser un numero
   * @example '123455'
   */
  @IsNotEmpty({ message: 'el número de teléfono es requerido' })
  @IsNumber()
  phone!: number;

  /***
   * Debe ser un string de entre 5 a 20 caracteres
   * @example 'Demo Country'
   */
  @IsNotEmpty({ message: 'el país es requerido' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country!: string;

  /***
   * Debe ser un string de entre 3 a 80 caracteres
   * @example 'Demo Street 123'
   */
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address!: string;

  /***
   * Debe ser un string de entre 5 a 20 caracteres
   * @example 'Demo City'
   */
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city!: string;

  @ApiHideProperty()
  @IsEmpty()
  roles!: Role[];
}

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
  password?: string;

  @ValidateIf((user: UpdateUserDto) => user.password !== undefined)
  @IsNotEmpty({ message: 'la confirmación de la contraseña es requerida' })
  @Validate(MatchPassword, ['password'])
  confirmPassword?: string;

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

  @IsEmpty()
  roles!: Role[];
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

export class UpdateUserRolesDto {
  /***
   * Array de roles a asignar al usuario
   * @example ["admin", "catalog_manager"]
   */
  @IsNotEmpty({ message: 'se requiere al menos un rol' })
  @IsArray({ message: 'roles debe ser un array' })
  @IsEnum(Role, { each: true, message: 'cada rol debe ser un valor válido' })
  roles!: Role[];
}
