import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
const server = express();
const app = await NestFactory.create(AppModule);
app.enableCors({
  origin: 'http://localhost:5500', // ganti sesuai port frontend kamu
  credentials: true,
});
await app.listen(3000);

app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Tambahkan prefix global
app.setGlobalPrefix('api');

await app.listen(3000);
console.log('🚀 Application is running on: http://localhost:3000/api');

}



bootstrap();
