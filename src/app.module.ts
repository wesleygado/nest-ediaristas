import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuarios/usuarios.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Utils } from './common/utils/utils';
import { ServicesModule } from './servicos/servicos.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CommandModule } from 'nestjs-command';
import { UserCommand } from './usuarios/usuarios.command';
import { UsersService } from './usuarios/usuarios.service';
import { UsersController } from './usuarios/usuarios.controller';
import { UsersRepository } from './usuarios/usuarios.repository';
import * as ormconfig from 'src/ormconfig';

@Module({
  imports: [
    UsersModule,
    CommandModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthModule,
    ServicesModule,
  ],
  controllers: [AppController],
  providers: [
    UserCommand,
    UsersController,
    AppService,
    Utils,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
