import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PasswordReset } from 'src/password-reset/entities/password-reset.entity';
import { UsuarioApi } from 'src/usuario-api/entities/usuario-api.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async enviarEmailDeResetDeSenha(passwordReset: PasswordReset) {
    await this.mailerService.sendMail({
      to: passwordReset.email, //email que está liberado no mailgun - 'wesley.gado@treinaweb.com.br'
      from: 'E-Diaristas <ediaristas@suporte.com>',
      subject: 'Solicitação de Reset de Senha - Ediaristas',
      template: './resetar-senha',
      context: {
        link: `http://localhost:3000/confirmacao?token=${passwordReset.token}`,
      },
    });
  }
}
