import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './usuario-plataforma/usuario-plataforma.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Utils } from './common/utils/utils';
import { ServicesModule } from './servicos/servicos.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { CommandModule } from 'nestjs-command';
import { UserCommand } from './usuario-plataforma/usuarios.command';
import { UsersController } from './usuario-plataforma/usuario-plataforma.controller';
import { DiariasModule } from './diarias/diarias.module';
import { UsuarioApiModule } from './usuario-api/usuario-api.module';
import { PasswordResetModule } from './password-reset/password-reset.module';
import { MailModule } from './common/mail/mail.module';
import { TypeOrmConfigService } from './database/typeorm-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MailModule,
    UsersModule,
    CommandModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthModule,
    ServicesModule,
    DiariasModule,
    UsuarioApiModule,
    PasswordResetModule,
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
