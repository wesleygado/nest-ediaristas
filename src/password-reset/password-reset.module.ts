import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetController } from './password-reset.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetRepository } from './password-reset.repository';
import { UsuarioApiRepository } from 'src/usuario-api/usuario-api.repository';
import { MailService } from 'src/common/mail/mail.service';
import { UsersRepository } from 'src/usuarios/usuarios.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetRepository]),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, MailService],
})
export class PasswordResetModule {}
