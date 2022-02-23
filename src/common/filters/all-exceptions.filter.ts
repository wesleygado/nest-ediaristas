import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { Utils } from '../utils/utils';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    if (exception instanceof NotFoundException) {
      console.log(exception);
      response.redirect('/404');
    } else {
      console.log(exception);
      response.redirect('/500');
    }
  }
}
