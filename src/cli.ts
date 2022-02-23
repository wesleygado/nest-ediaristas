import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CommandModule, CommandService } from 'nestjs-command';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3001);
  await app.select(CommandModule).get(CommandService).exec();
  setTimeout(function () {
    app.close();
  }, 100);
}

bootstrap();
