import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';
import { UpdateUserDto } from 'src/dto/user.dto';
// respondera al PATH: /users
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  //retorna todos los usuarios
  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }
  //retorna un usuario por su id
  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: Users) {
    return this.usersRepository.addUser(user);
  }

  updateUser(id: string, userNewData: UpdateUserDto) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }
}
