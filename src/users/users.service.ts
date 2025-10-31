import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
// respondera al PATH: /users
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  //retorna todos los usuarios
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  //retorna un usuario por su id
  getUser(id: string) {
    return this.usersRepository.getUser(id);
  }

  addUser(user: any) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, userNewData: any) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
