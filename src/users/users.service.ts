import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { Users } from 'src/users/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from 'src/users/dto/user.dto';
import { Role } from 'src/auth/enums/roles.enum';

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

  updateRoles(id: string, roles: Role[]) {
    return this.usersRepository.updateRoles(id, roles);
  }
}
