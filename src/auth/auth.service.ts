import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class AuthService {
  constructor(private readonly usersRepository: UsersRepository) {}
  getAuth() {
    return 'auth funciona';
  }

  signIn(email: string, password: string) {
    if (!email || !password) {
      return 'Email y password son obligatorios';
    }
    const user = this.usersRepository.getUserByEmail(email);

    if (!user || user.password !== password) {
      return 'Credenciales invalidas';
    }

    return 'usuario logeado (aqui el token)';
  }
}
