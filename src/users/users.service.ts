import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  getUsers(page: number, limit: number) {
    return this.usersRepository.getUsers(page, limit);
  }

  getUserById(id: string) {
    return this.usersRepository.getUserById(id);
  }

  addUser(user: Users) {
    return this.usersRepository.addUser(user);
  }

  createUser(createUserDto: CreateUserDto) {
    return this.usersRepository.addUser(createUserDto);
  }

  updateUser(id: string, userNewData: UpdateUserDto) {
    return this.usersRepository.updateUser(id, userNewData);
  }

  deleteUser(id: string) {
    return this.usersRepository.deleteUser(id);
  }

  setAdminStatus(id: string, isAdmin: boolean) {
    return this.usersRepository.setAdminStatus(id, isAdmin);
  }
}
