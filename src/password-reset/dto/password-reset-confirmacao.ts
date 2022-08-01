import { IsNotEmpty } from 'class-validator';

export class PasswordResetConfirmacaoDto {
  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  confirmacaoSenha: string;

  tokenPassword: string;
}
