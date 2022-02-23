import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  UnauthorizedException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (
      exception instanceof UnauthorizedException ||
      exception instanceof ForbiddenException
    ) {
      request.flash(
        'loginError',
        'Essas credenciais não foram encontradas em nossos registros',
      );
      request.flash('user_name', request.body.username);
      request.flash('class', 'is-invalid');
      request.flash('invalid', 'erro-form-login');
      response.redirect('/login');
    } else if (exception instanceof NotFoundException) {
      response.redirect('/404');
    }
  }
}
