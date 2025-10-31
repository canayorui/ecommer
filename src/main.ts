import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// Bootstrap  inicia la aplicacion
async function bootstrap() {
  // Crear una instancia de la aplicacion NestJS
  const app = await NestFactory.create(AppModule);
  // Escuchar en el puerto 3000 o el definido en las variables de entorno
  await app.listen(process.env.PORT ?? 3000);
}
//aqui va llamar a la funcion bootstrap
bootstrap();
