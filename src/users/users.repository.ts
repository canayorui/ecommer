import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

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

    return users.map(({ password, ...userNoPassword }) => userNoPassword);
  }
  //metodo para obtener un usuario por id sin la propiedad password
  async getUserById(id: string): Promise<Omit<Users, 'password'> | string> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) return `no se mostro el usuario con id: ${id}`;
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  //metodo para agregar un usuario
  async addUser(user: Users): Promise<Omit<Users, 'password'>> {
    const newUser = await this.usersRepository.save(user);
    const { password, ...userNoPassword } = newUser;
    return userNoPassword;
  }
  //este metodo crea un nuevo usuario.
  async updateUser(id: string, user: Users): Promise<Omit<Users, 'password'>> {
    await this.usersRepository.update(id, user);
    const updateUser = await this.usersRepository.findOneBy({ id });
    if (!updateUser) throw new Error(`Usuario con id: ${id} no encontrado`);
    const { password, ...userNoPassword } = updateUser;
    return userNoPassword;
  }
  //este metodo elimina un usuario por id
  async deleteUser(id: string): Promise<Omit<Users, 'password'> | string> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return `no se encontro el usuario con id: ${id}`;
    await this.usersRepository.remove(user);
    const { password, ...userNoPassword } = user;
    return userNoPassword;
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    return await this.usersRepository.findOneBy({ email });
  }
}
