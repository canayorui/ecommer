import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { Role } from 'src/auth/enums/roles.enum';

interface AuthenticatedUser {
  id: string;
  roles: Role[];
  expiresAt: number;
}

interface JwtPayload {
  id: string;
  roles: Role[];
  exp: number;
}

type CustomRequest = Request & { user?: AuthenticatedUser };

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<CustomRequest>();

    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException(
        'No se proporcionó token de autorización',
      );
    }

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('no se a enviado el token invalido');
    }

    try {
      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_SECRET,
      });

      const roles = payload.roles ?? [Role.User];

      request.user = {
        id: payload.id,
        roles,
        expiresAt: payload.exp,
      };

      return true;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException(
          'El token expiró, vuelve a iniciar sesión',
        );
      }
      throw new UnauthorizedException('Token de autenticación inválido');
    }
  }
}
