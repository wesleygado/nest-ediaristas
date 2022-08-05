import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { MailService } from 'src/common/mail/mail.service';
import { UsersRepository } from 'src/usuario-plataforma/usuario-plataforma.repository';
import { Repository } from 'typeorm';
import { PasswordResetConfirmacaoDto } from './dto/password-reset-confirmacao';
import { PasswordReset } from './entities/password-reset.entity';

@Injectable()
export class PasswordResetService {
  constructor(
    @InjectRepository(PasswordReset)
    private passwordRepository: Repository<PasswordReset>,
    private usuario: UsersRepository,
    private mail: MailService,
  ) {}

  async criarPasswordReset(email: string) {
    const passwordReset = new PasswordReset();
    if ((await this.usuario.repository.findBy({ email: email })).length > 0) {
      passwordReset.email = email;
      passwordReset.token = randomUUID();
      await this.passwordRepository.save(passwordReset);
    }
    if (passwordReset.email != null) {
      /*       console.log(passwordReset.email);
      this.mail.enviarEmailDeResetDeSenha(passwordReset); */
    }
    return null;
  }

  async resetarSenha(token: string, novaSenha: string) {
    const passwordReset = await this.buscarPasswordResetPorToken(token);
    const usuario = await this.usuario.repository.findOneBy({
      email: passwordReset.email,
    });
    await usuario.setPassword(novaSenha);
    await this.usuario.repository.save(usuario);
    await this.passwordRepository.delete(passwordReset.id);
  }

  async confirmarResetSenha(
    request: PasswordResetConfirmacaoDto,
    token: string,
  ) {
    await this.validarConfirmacaoSenha(request);
    await this.resetarSenha(token, request.senha);

    return { mensagem: 'Senha alterada com sucesso' };
  }

  private async buscarPasswordResetPorToken(passwordResetToken: string) {
    const passwordReset = await this.passwordRepository.findOneBy({
      token: passwordResetToken,
    });
    if (!passwordReset) {
      throw new NotFoundException();
    }
    return passwordReset;
  }

  private validarConfirmacaoSenha(request: PasswordResetConfirmacaoDto) {
    const senha = request.senha;
    const confirmacaoSenha = request.confirmacaoSenha;

    if (senha != confirmacaoSenha) {
      throw new BadRequestException('Os campos de senha não conferem');
    }
  }
}
