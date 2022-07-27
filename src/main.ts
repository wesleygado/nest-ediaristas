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
import { EntityRepository, getConnection } from 'typeorm';
import DiariaStatus from './diarias/diaria-status.enum';
import { DiariasService } from './diarias/diarias.service';
import { DiariaRepository } from './diarias/diarias.repository';
import { getManager } from 'typeorm';

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
        calcularTransferencia: function (preco: number, comissao: number) {
          const valorTransferencia = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          const transferencia = preco - comissao;
          return valorTransferencia.format(transferencia);
        },
        converterReal: function (valor: number) {
          const formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          });
          return formatter.format(valor);
        },
        converterData: function (data: Date) {
          const dataAtendimento = new Date(data);
          const horas = String(dataAtendimento.getHours()).padStart(2, '0');
          const minutos = String(dataAtendimento.getMinutes()).padStart(2, '0');
          const segundos = String(dataAtendimento.getSeconds()).padStart(
            2,
            '0',
          );
          return `${dataAtendimento.toLocaleDateString(
            'pt-BR',
          )} ${horas}:${minutos}:${segundos}`;
        },
        validarPagamento: function (status: number, id: number) {
          if (
            status === DiariaStatus.AVALIADO ||
            status === DiariaStatus.CONCLUIDO
          ) {
            return `href="${id}/pagar" class="btn btn-primary" onclick="alert('Confirma a alteração de Status para Transferido?)"`;
          }
          return 'class="btn btn-danger disabled"';
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
