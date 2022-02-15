import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';
import { ArgumentsHost, ConsoleLogger, Req, ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as methodOverride from 'method-override';
import flash = require('connect-flash');
import { Request, Response, NextFunction } from 'express';
import * as express from 'express';
import { stringify } from 'querystring';

async function bootstrap() {
  const exp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  const viewsPath = join(__dirname, '../views');
  
  app.use(function(req: Request, res, next) {
    exp.locals.expreq = req;
    next();
  });

  app.engine('.hbs', exphbs.engine({ extname: '.hbs',
  defaultLayout: 'main',
  helpers: {

    /* CUSTOM HELPERS */

    menuCadastroService: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'services/create' || url === 'services/index') {
        return 'active';
      }
      return '';
    },
    menuCadastroServiceOpen: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'services/create' || url === 'services/index') {
        return 'menu-is-opening menu-open';
      } 
      return '';
    },
    menuIndexService: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'services/index') {
        return 'active';
      } 
      return '';
    },
    menuCreateService: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'services/create') {
        return 'active';
      } 
      return '';
    },
    menuCadastroUser: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'users/create' || url === 'users/index') {
        return 'active';
      }
      return '';
    },
    menuCadastroUserOpen: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'users/create' || url === 'users/index') {
        return 'menu-is-opening menu-open';
      } 
      return '';
    },
    menuIndexUser: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'users/index') {
        return 'active';
      } 
      return '';
    },
    menuCreateUser: function(view) {
      const url: string = view['data']['exphbs']['view'];
      if (url === 'users/create') {
        return 'active';
      } 
      return '';
    },
    userMenu: function() {
      const user = exp.locals.expreq;
      return user['user']['name'];
    }
  },
  }));

  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(methodOverride('_method'));

  app.use(
    session({
      secret: 'nest-treinaweb',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
