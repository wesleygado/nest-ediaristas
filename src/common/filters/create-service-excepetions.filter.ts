import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { Utils } from '../utils/utils';

@Catch(HttpException)
export class CreateServiceException implements ExceptionFilter {
  constructor(private utils: Utils) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (
      exception instanceof BadRequestException ||
      exception instanceof InternalServerErrorException ||
      exception instanceof ForbiddenException
    ) {
      request.flash(
        'message',
        this.utils.exceptionToString(exception['response']['message']),
      );
      const service = request.body;
      request.flash('service_name', service.name);
      request.flash('service_valor_minimo', service.valor_minimo);
      request.flash('service_quantidade_horas', service.quantidade_horas);
      request.flash('service_porcentagem', service.porcentagem);
      request.flash('service_valor_quarto', service.valor_quarto);
      request.flash('service_horas_quarto', service.horas_quarto);
      request.flash('service_valor_sala', service.valor_sala);
      request.flash('service_horas_sala', service.horas_sala);
      request.flash('service_valor_banheiro', service.valor_banheiro);
      request.flash('service_horas_banheiro', service.horas_banheiro);
      request.flash('service_valor_cozinha', service.valor_cozinha);
      request.flash('service_horas_cozinha', service.horas_cozinha);
      request.flash('service_valor_quintal', service.valor_quintal);
      request.flash('service_horas_quintal', service.horas_quintal);
      request.flash('service_valor_outros', service.valor_outros);
      request.flash('service_horas_outros', service.horas_outros);
      request.flash('service_icone', service.icone);
      request.flash('service_posicao', service.posicao);

      request.flash('alert', 'alert alert-danger');
      response.redirect('/services/create');
    } else {
      response.redirect('/services/index');
    }
  }
}
