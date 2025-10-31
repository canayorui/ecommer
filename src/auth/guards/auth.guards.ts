import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest<Request>();
      return this.validateRequest(request);
    } catch (error) {
      throw new UnauthorizedException('Invalid authentication');
    }
  }

  private validateRequest(request: Request): boolean {
    const authHeader = request.headers.authorization;

    if (!authHeader || typeof authHeader !== 'string') {
      return false;
    }

    const parts = authHeader.split(' ');
    if (parts.length !== 2 || parts[0] !== 'Basic') {
      return false;
    }

    try {
      // Decodificar Base64
      const decoded = Buffer.from(parts[1], 'base64').toString();
      const [email, password] = decoded.split(':');

      if (!email || !password) {
        return false;
      }

      // Aquí deberías validar contra tu base de datos
      // Por ahora solo validamos el formato
      return this.validateCredentials(email, password);
    } catch (error) {
      return false;
    }
  }

  private validateCredentials(email: string, password: string): boolean {
    // TODO: Implementar validación real contra base de datos
    // Por ahora solo validamos formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && password.length > 0;
  }
}
