import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as exphbs from 'express-handlebars';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import * as passport from 'passport';
import * as methodOverride from 'method-override';
import flash = require('connect-flash');
import { Request } from 'express';
import * as express from 'express';
import * as csrf from 'csurf';
import * as cookieParser from 'cookie-parser';
import { CommandModule, CommandService } from 'nestjs-command';
import { getConnection } from 'typeorm';

async function bootstrap() {
  const exp = express();
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  const viewsPath = join(__dirname, '../views');
  app.use(function (req: Request, res, next) {
    exp.locals.expreq = req;
    next();
  });

  app.engine(
    '.hbs',
    exphbs.engine({
      extname: '.hbs',
      defaultLayout: 'main',
      helpers: {
        /* CUSTOM HELPERS */

        menuSuperior: function (classe, view1, view2) {
          const url: string = exp.locals.expreq['originalUrl'];
          if (url === view1 || url === view2) {
            return classe;
          }
          return '';
        },
        menuSubItem: function (view) {
          const url: string = exp.locals.expreq['originalUrl'];
          if (url === view) {
            return 'active';
          }
          return '';
        },
        userMenu: function () {
          const user = exp.locals.expreq;
          return user['user']['name'];
        },
      },
    }),
  );

  app.set('views', viewsPath);
  app.set('view engine', '.hbs');

  app.use(methodOverride('_method'));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      secret: 'nest-treinaweb',
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(csrf());
  app.use(flash());

  await app.listen(3000);
}
bootstrap();
