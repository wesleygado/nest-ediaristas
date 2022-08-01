import {
  Controller,
  Get,
  Body,
  Render,
  Redirect,
  Post,
  Request,
  Query,
} from '@nestjs/common';
import { query } from 'express';
import { MailService } from 'src/common/mail/mail.service';
import { PasswordResetConfirmacaoDto } from './dto/password-reset-confirmacao';
import { PasswordResetDto } from './dto/password-reset.dto';
import { PasswordResetService } from './password-reset.service';

@Controller()
export class PasswordResetController {
  constructor(
    private readonly passwordResetService: PasswordResetService,
    mail: MailService,
  ) {}

  @Get('password-reset')
  @Render('resetar-senha')
  telaReset(@Request() req) {
    return {
      layout: false,
      csrfToken: req.csrfToken(),
    };
  }

  @Post('password-reset')
  @Redirect('/login')
  async solicitarPasswordReset(@Body() passwordResetdto: PasswordResetDto) {
    await this.passwordResetService.criarPasswordReset(passwordResetdto.email);
    return {
      layout: false,
    };
  }

  @Get('confirmacao')
  @Render('confirmacao')
  async telaConfirmar(@Request() req, @Query('token') token: string) {
    console.log(token);
    return {
      layout: false,
      csrfToken: req.csrfToken(),
      tokenPassword: token,
    };
  }

  @Post('confirmacao')
  @Redirect('/login')
  async resetarSenha(@Body() password: PasswordResetConfirmacaoDto) {
    await this.passwordResetService.confirmarResetSenha(
      password,
      password.tokenPassword,
    );
    return {
      layout: false,
    };
  }
}
