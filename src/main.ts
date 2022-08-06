import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Request } from 'express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //*validationを使うために必要 whitelist -> validateに必要ないものがある場合はwhitelistをtrueにしていると省いてくれる
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors({ credentials: true, origin: 'http://localhost:3000' });
  app.use(cookieParser());

  await app.listen(3005);
}
bootstrap();
