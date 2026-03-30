import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
  getAuth() {
    return 'auth funciona';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('email y password son requeridos');
    }
    const foundUser = await this.usersRepository.getUserByEmail(email);
    const validPassword =
      foundUser && (await bcrypt.compare(password, foundUser.password));

    if (!validPassword) {
      throw new UnauthorizedException('Email o password incorrectos');
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: 'usuario logeado(token)',
      token: token,
    };
  }

  async signUp(user: CreateUserDto) {
    const { email, password, confirmPassword, ...rest } = user;
    if (!email || !password) {
      throw new BadRequestException(' email y password  son necesarios');
    }

    if (password !== confirmPassword) {
      throw new BadRequestException('Las contraseñas no coinciden');
    }

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser) {
      throw new BadRequestException(`Usuario con email: ${email} ya existe`);
    }

    if (typeof password !== 'string') {
      throw new BadRequestException('La contraseña debe ser una cadena');
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const created = await this.usersRepository.addUser({
        ...rest,
        email,
        password: hashedPassword,
      });
      const safeUser: Partial<Users> = created;
      return safeUser;
    } catch (error) {
      console.error('Error al hashear la contraseña:', error);
      throw new BadRequestException('Error al crear el usuario');
    }
  }
}
