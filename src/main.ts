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

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public'));
  const viewsPath = join(__dirname, '../views');

  app.engine('.hbs', exphbs.engine({ extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    calc: function(req: Request) {
      console.log(req.path)
      return req.path;
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
