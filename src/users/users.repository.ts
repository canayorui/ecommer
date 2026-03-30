import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from 'src/dto/user.dto';
import * as bcrypt from 'bcrypt';

type SanitizedUser = Omit<Users, 'password' | 'isAdmin' | 'orders'>;
type OrderSummary = { id: string; date: Date };

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  private sanitizeUser(user: Users): SanitizedUser {
    const safeUser = { ...user } as Partial<Users>;
    delete safeUser.password;
    delete safeUser.isAdmin;
    delete safeUser.orders;
    return safeUser as SanitizedUser;
  }

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
  async getUserById(
    id: string,
  ): Promise<SanitizedUser & { orders: OrderSummary[] }> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        orders: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`Usuario con id: ${id} no encontrado`);
    }
    const orders = (user.orders ?? []).map((order) => ({
      id: order.id,
      date: order.date,
    }));

    const safeUser = this.sanitizeUser(user);
    return { ...safeUser, orders };
  }

  //metodo para agregar un usuario
  async addUser(user: Partial<Users>): Promise<SanitizedUser> {
    if (!user.email || !user.password) {
      throw new BadRequestException('email y password son requeridos');
    }
    const payload = { ...user } as typeof user & {
      confirmPassword?: string;
    };
    delete payload.confirmPassword;

    const newUser = await this.usersRepository.save(payload);
    const dbUser = await this.usersRepository.findOneBy({ id: newUser.id });
    return this.sanitizeUser(dbUser!);
  }
  //este metodo crea un nuevo usuario.
  async updateUser(id: string, user: UpdateUserDto): Promise<SanitizedUser> {
    const userFromDb = await this.usersRepository.findOneBy({ id });
    if (!userFromDb) {
      throw new NotFoundException(`usuario con id: ${id} no encontrado`);
    }

    const payload = { ...user } as UpdateUserDto & {
      confirmPassword?: string;
    };
    delete payload.confirmPassword;

    if (payload.password) {
      userFromDb.password = await bcrypt.hash(payload.password, 10);
    }

    Object.entries(payload).forEach(([key, value]) => {
      if (value !== undefined && key !== 'password' && key !== 'isAdmin') {
        const mutableUser = userFromDb as unknown as Record<string, unknown>;
        mutableUser[key] = value;
      }
    });

    const savedUser = await this.usersRepository.save(userFromDb);
    return this.sanitizeUser(savedUser);
  }
  //este metodo elimina un usuario por id
  async deleteUser(id: string): Promise<SanitizedUser> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`no existe un usuario con id: ${id}`);
    }
    await this.usersRepository.remove(user);
    return this.sanitizeUser(user);
  }

  async setAdminStatus(id: string, isAdmin: boolean): Promise<SanitizedUser> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`usuario con id: ${id} no encontrado`);
    }

    user.isAdmin = isAdmin;
    const savedUser = await this.usersRepository.save(user);
    return this.sanitizeUser(savedUser);
  }

  async getUserByEmail(email: string): Promise<Users | null> {
    const foundUser = await this.usersRepository.findOneBy({ email });
    return foundUser;
  }
}
