import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as compression from 'compression';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  app.enableCors();
  app.use(cookieParser());
  app.use( 
    session({
      secret: process.env.COOKIE_SECRET_KEY,
      resave: false,
      saveUninitialized: true
    })
  );
  app.use(compression());
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3000);
}
bootstrap();
