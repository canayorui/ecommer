import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date().toISOString();
    this.logger.log(
      `[${timestamp}] Método ${method} en la ruta ${originalUrl}`,
    );
    next();
  }
}

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('LoggerGlobal');
  logger.log(
    `Estás ejecutando un método ${req.method} en la ruta ${req.originalUrl}`,
  );
  next();
}
