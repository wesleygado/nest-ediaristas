import {
  Controller,
  Get,
  Post,
  Render,
  Res,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { LoginGuard } from './common/guards/login.guard';
import { Response } from 'express';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
export class AppController {
  @UseFilters(AuthExceptionFilter)
  @Get('login')
  @Render('login')
  login(@Request() req): {
    layout: boolean;
    message: string;
    class: string;
    invalid: string;
  } {
    return {
      layout: false,
      message: req.flash('loginError'),
      class: req.flash('class'),
      invalid: req.flash('invalid'),
    };
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Post('/login')
  doLogin(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  home(@Request() req) {
    return { user: req.user };
  }
}
