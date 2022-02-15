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
export class CreateUserException implements ExceptionFilter {
  constructor(private utils: Utils) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (exception instanceof BadRequestException) {
      request.flash(
        'message',
        this.utils.exceptionToString(exception['response']['message']),
      );
      const user = request.body;
      request.flash('user', user);
      request.flash('alert', 'alert alert-danger');
      response.redirect('/users/create');
    } else {
      response.redirect('/users/index');
    }
  }
}
