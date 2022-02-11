import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { Utils } from '../utils/utils';

@Catch(HttpException)
export class PatchUserException implements ExceptionFilter {
  constructor(private utils: Utils) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (
      exception instanceof BadRequestException ||
      exception instanceof InternalServerErrorException
    ) {
      request.flash(
        'message',
        this.utils.exceptionToString(exception['response']['message']),
      );
      request.flash('user_name', request.body.name);
      request.flash('user_email', request.body.email);
      request.flash('alert', 'alert alert-danger');
      response.redirect('edit');
    } else {
      response.redirect('/users/index');
    }
  }
}
