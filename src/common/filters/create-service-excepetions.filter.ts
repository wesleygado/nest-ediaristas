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
      request.flash(service);
      request.flash('alert', 'alert alert-danger');
      response.redirect('/services/create');
    } else {
      response.redirect('/services/index');
    }
  }
}
