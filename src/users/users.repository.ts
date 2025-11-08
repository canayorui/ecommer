import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/user.dto';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  //metodo para obtener todos los usuarios sin la propiedad password
  async getUsers(
    page: number,
    limit: number,
  ): Promise<Omit<Users, 'password'>[]> {
    const skip = (page - 1) * limit; //
    const users = await this.usersRepository.find({
      take: limit,
      skip: skip,
    });
    return users.map(({ password, ...userNoPassword }) => userNoPassword); // eslint-disable-line @typescript-eslint/no-unused-vars
  }
  //metodo para obtener un usuario por id sin la propiedad password
  async getUserById(id: string): Promise<Omit<Users, 'password'>> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }

    const { password, ...userNoPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    return userNoPassword;
  }

  //metodo para agregar un usuario
  async addUser(user: Users): Promise<Omit<Users, 'password'>> {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userNoPassword } = newUser; // eslint-disable-line @typescript-eslint/no-unused-vars
    return userNoPassword;
  }
  //este metodo crea un nuevo usuario.
  async updateUser(
    id: string,
    user: UpdateUserDto,
  ): Promise<Omit<Users, 'password'>> {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) {
      throw new NotFoundException(`usuario ${id} no creado`);
    }
    const { password, ...userNoPassword } = updateUser; // eslint-disable-line @typescript-eslint/no-unused-vars
    return userNoPassword;
  }
  //este metodo elimina un usuario por id
  async deleteUser(id: string): Promise<Omit<Users, 'password'> | string> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`no existe un usuario con id: ${id}`);
    }
    await this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
