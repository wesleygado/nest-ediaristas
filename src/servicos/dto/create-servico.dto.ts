import {
  IsCurrency,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateServiceDto {
  id: number;

  @MinLength(3, {
    message: 'Digite um nome válido com mais de 3 caracteres',
  })
  name: string;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor mínimo com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo valor mínimo não pode ser vazio.',
  })
  valor_minimo: number;

  @IsNumberString('', {
    message: 'Campo quantidade mínima de horas deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade mínima de horas deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo quantidade mínima de horas não pode ser vazio',
  })
  quantidade_horas: number;

  @IsNumberString('', {
    message: 'Campo porcentagem deve ser um número válido',
  })
  @MaxLength(2, {
    message: 'Campo porcentagem deve ser entre 0 e 99',
  })
  @IsNotEmpty({
    message: 'Campo porcentagem não pode ser vazio.',
  })
  porcentagem: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor por quarto com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo valor por quarto não pode ser vazio.',
  })
  valor_quarto: number;

  @IsNumberString('', {
    message: 'Campo quantidade de horas por quarto deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade de horas por quarto deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo quantidade de horas por quarto não pode ser vazio.',
  })
  horas_quarto: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor sala com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo Valor sala não pode ser vazio.',
  })
  valor_sala: number;

  @IsNumberString('', {
    message: 'Campo quantidade de horas por sala deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade de horas por sala deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo quantidade de horas por sala não pode ser vazio.',
  })
  horas_sala: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor por banheiro com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo valor por banheiro não pode ser vazio.',
  })
  valor_banheiro: number;

  @IsNumberString('', {
    message: 'Campo quantidade de horas por banheiro deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade de horas por banheiro deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo quantidade de horas por banheiro não pode ser vazio.',
  })
  horas_banheiro: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor por cozinha com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo valor por cozinha não pode ser vazio.',
  })
  valor_cozinha: number;

  @IsNumberString('', {
    message: 'Campo quantidade de horas por cozinha deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade de horas por cozinha deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo horas por cozinha não pode ser vazio.',
  })
  horas_cozinha: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    { message: 'Campo valor por quintal com formato inválido.' },
  )
  @IsNotEmpty({
    message: 'Campo valor por quintal não pode ser vazio.',
  })
  valor_quintal: number;

  @IsNumberString('', {
    message: 'Campo quantidade de horas por quintal deve ser um número válido',
  })
  @MaxLength(1, {
    message: 'Campo quantidade de horas por quintal deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message: 'Campo horas por quintal não pode ser vazio.',
  })
  horas_quintal: number;

  @IsCurrency(
    { thousands_separator: '.', decimal_separator: ',' },
    {
      message: 'Campo valor por outros tipos de cômodos com formato inválido.',
    },
  )
  @IsNotEmpty({
    message: 'Campo valor por outros tipos de cômodos não pode ser vazio.',
  })
  valor_outros: number;

  @IsNumberString('', {
    message:
      'Campo quantidade de horas por outros tipos de cômodos deve ser um número válido',
  })
  @MaxLength(1, {
    message:
      'Campo quantidade de horas por outros tipos de cômodos deve ser entre 0 e 9',
  })
  @IsNotEmpty({
    message:
      'Campo quantidade de horas por outros tipos de cômodos não pode ser vazio.',
  })
  horas_outros: number;

  @IsNotEmpty({
    message: 'Campo icone não pode ser vazio.',
  })
  icone: string;

  @IsNumberString('', {
    message: 'Campo posição deve ser um número válido',
  })
  @MaxLength(2, {
    message: 'Campo posição deve ser entre 0 e 99',
  })
  @IsNotEmpty({
    message: 'Campo posição não pode ser vazio.',
  })
  posicao: number;
}
