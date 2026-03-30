import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository';

interface BasicUserPayload {
  id: string;
  email: string;
}

@Injectable()
export class BasicAuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const [type, credentials] = authHeader.split(' ');

    if (type !== 'Basic' || !credentials) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    let decoded = '';
    try {
      decoded = Buffer.from(credentials, 'base64').toString('utf-8');
    } catch (error) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const separatorIndex = decoded.indexOf(':');
    if (separatorIndex === -1) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const email = decoded.substring(0, separatorIndex);
    const password = decoded.substring(separatorIndex + 1);

    if (!email || !password) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const user = await this.usersRepository.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    const basicUser: BasicUserPayload = { id: user.id, email: user.email };
    (request as Request & { user?: BasicUserPayload }).user = basicUser;

    return true;
  }
}
