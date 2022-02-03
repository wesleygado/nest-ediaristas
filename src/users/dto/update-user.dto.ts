import { IsEmail, MinLength } from 'class-validator';

export class UpdateUserDto {
  id: number;

  @MinLength(3, {
    message: 'Digite um nome válido',
  })
  name: string;

  @IsEmail({}, { message: 'Digite um e-mail válido' })
  email: string;

  @MinLength(8, {
    message: 'Senha com mínimo de 8 caracteres',
  })
  password: string;

  password_confirmation: string;
}
