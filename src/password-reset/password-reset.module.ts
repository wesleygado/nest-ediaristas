import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailService } from 'src/common/mail/mail.service';
import { UsersRepository } from 'src/usuario-plataforma/usuario-plataforma.repository';
import { UsuarioPlataforma } from 'src/usuario-plataforma/entities/usuario-plataforma.entity';
import { PasswordReset } from './entities/password-reset.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordReset]),
    TypeOrmModule.forFeature([UsuarioPlataforma]),
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, MailService, UsersRepository],
})
export class PasswordResetModule {}
