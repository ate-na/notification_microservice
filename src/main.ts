import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      host: process.env.NOTIFICATION_HOST,
      port: +process.env.NOTIFICATION_PORT,
    },
  });
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
