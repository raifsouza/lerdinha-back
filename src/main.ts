import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    console.log('Iniciando Nest...');
  const app = await NestFactory.create(AppModule);
   console.log('App criado');
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
