import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'auth funciona';
  }

  async signIn(email: string, password: string) {
    if (!email || !password) {
      throw new BadRequestException('email y password son requeridos');
    }
    const user = await this.usersRepository.getUserByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Email y password incorrectos');
    }

    return 'usuario logeado (aqui el token)';
  }
}
