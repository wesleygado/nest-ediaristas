import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { ContextIdFactory, ModuleRef } from '@nestjs/core';
import { Request, Response } from 'express';
import { AppService } from 'src/app.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(request);
    if (exception instanceof NotFoundException) {
      response.redirect('/404');
    } else {
      response.redirect('/500');
    }
  }
}
