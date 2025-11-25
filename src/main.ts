import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Bootstrap  inicia la aplicacion
async function bootstrap() {
  // Crear una instancia de la aplicacion NestJS
  const app = await NestFactory.create(AppModule);
  // Habilitar el uso de pipes globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API Ecommerce CanayoRui')
    .setDescription('API para la gestion de un ecommerce')
    .setVersion('1.0.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory());
  // Escuchar en el puerto 3000 o el definido en las variables de entorno
  const PORT = Number(process.env.PORT) || 3000;
  const HOST = process.env.HOST || 'localhost';
  await app.listen(PORT);
  console.log(`el servidor esta escuchando en  http://${HOST}:${PORT}`);
}
//aqui va llamar a la funcion bootstrap
bootstrap().catch((error) => {
  console.error('Error al iniciar la aplicación:', error);
  process.exit(1);
});
