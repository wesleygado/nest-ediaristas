import {
  Controller,
  Get,
  Post,
  Render,
  Res,
  UseGuards,
  Request,
  UseFilters,
  Redirect,
} from '@nestjs/common';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { LoginGuard } from './common/guards/login.guard';
import { Response } from 'express';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @Get('login')
  async login(@Request() req, @Res() res: Response) {
    if (!req.isAuthenticated()) {
      res.render('login', {
        layout: false,
        message: req.flash('loginError'),
        class: req.flash('class'),
        invalid: req.flash('invalid'),
        user_name: req.flash('user_name'),
      });
    } else {
      res.redirect('home');
    }
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(LoginGuard)
  @Post('/login')
  doLogin(@Res() res: Response) {
    res.redirect('/home');
  }

  @Post('logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout();
    res.redirect('/login');
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  home(@Request() req) {
    return { user: req.user };
  }
}
