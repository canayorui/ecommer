import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// Bootstrap  inicia la aplicacion
async function bootstrap() {
  // Crear una instancia de la aplicacion NestJS
  const app = await NestFactory.create(AppModule);
  // Habilitar el uso de pipes globales
  app.useGlobalPipes(new ValidationPipe());
  // Escuchar en el puerto 3000 o el definido en las variables de entorno
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT);
  console.log(`el servidor esta escuchando en  http://${HOST}:${PORT}`);
}
//aqui va llamar a la funcion bootstrap
bootstrap();
