import { PartialType } from '@nestjs/mapped-types';
import { IsDecimal, IsNotEmpty, MinLength } from 'class-validator';
import { CreateServiceDto } from './create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {
  id: number;

  @IsNotEmpty({
    message: 'Campo nome não pode ser vazio.',
  })
  nam: string;

  @IsNotEmpty({
    message: 'Campo Valor Mínimo não pode ser vazio.',
  })
  valor_minimo: number;

  @IsNotEmpty({
    message: 'Campo Quantidade Horas não pode ser vazio.',
  })
  quantidade_horas: number;

  @IsNotEmpty({
    message: 'Campo porcentagem não pode ser vazio.',
  })
  porcentagem: number;

  @IsNotEmpty({
    message: 'Campo Valor Quarto não pode ser vazio.',
  })
  valor_quarto: number;

  @IsNotEmpty({
    message: 'Campo Horas Quarto não pode ser vazio.',
  })
  horas_quarto: number;

  @IsNotEmpty({
    message: 'Campo Valor Sala não pode ser vazio.',
  })
  valor_sala: number;

  @IsNotEmpty({
    message: 'Campo Horas Sala não pode ser vazio.',
  })
  horas_sala: number;

  @IsNotEmpty({
    message: 'Campo Valor Banheiro não pode ser vazio.',
  })
  valor_banheiro: number;

  @IsNotEmpty({
    message: 'Campo Horas Banheiro não pode ser vazio.',
  })
  horas_banheiro: number;

  @IsNotEmpty({
    message: 'Campo Valor Cozinha não pode ser vazio.',
  })
  valor_cozinha: number;

  @IsNotEmpty({
    message: 'Campo Horas Cozinha não pode ser vazio.',
  })
  horas_cozinha: number;

  @IsNotEmpty({
    message: 'Campo Valor Quintal não pode ser vazio.',
  })
  valor_quintal: number;

  @IsNotEmpty({
    message: 'Campo Horas Quintal não pode ser vazio.',
  })
  horas_quintal: number;

  @IsNotEmpty({
    message: 'Campo Valor Outros não pode ser vazio.',
  })
  valor_outros: number;

  @IsNotEmpty({
    message: 'Campo Horas Outros não pode ser vazio.',
  })
  horas_outros: number;

  @IsNotEmpty({
    message: 'Campo icone não pode ser vazio.',
  })
  icone: string;

  @IsNotEmpty({
    message: 'Campo posição não pode ser vazio.',
  })
  posicao: number;
}
