import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { Utils } from '../utils/utils';

@Catch(HttpException)
export class PatchException implements ExceptionFilter {
  constructor(private utils: Utils) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const old = request.body;

    if (exception instanceof BadRequestException) {
      request.flash(
        'message',
        this.utils.exceptionToString(exception['response']['message']),
      );
      request.flash('old', old);
      request.flash('alert', 'alert alert-danger');
      response.redirect('edit');
    } else if (
      exception instanceof ForbiddenException ||
      exception instanceof UnauthorizedException
    ) {
      console.log(exception);
      response.redirect('/login');
    } else {
      response.redirect('index');
    }
  }
}
