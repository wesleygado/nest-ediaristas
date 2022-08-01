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
import DiariaStatus from './diarias/diaria-status.enum';

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
            return `href="${id}/pagar" class="btn btn-primary"`;
          }
          return 'class="btn btn-danger disabled"';
        },
        exibirStatus: (status: number) => {
          switch (status) {
            case 1:
              return 'Aguardando Pagamento';
            case 2:
              return 'PAGO';
            case 3:
              return 'Diarista Selecionado';
            case 4:
              return 'Presença Confirmada';
            case 5:
              return 'Cancelada';
            case 6:
              return 'Avaliada';
            case 7:
              return 'Transferido para diarista';
            default:
              return 'SEM STATUS';
          }
        },
        getParamCliente: (param: string) => {
          const protocol = exp.locals.expreq.protocol;
          const host = exp.locals.expreq.hostname;
          const url = exp.locals.expreq.originalUrl;
          const port = 3000;

          const fullUrl = new URL(`${protocol}://${host}:${port}${url}`);
          console.log(fullUrl);
          const paramFilter = fullUrl.searchParams.get(param);
          paramFilter === '123' ? true : false;
          paramFilter === '5' ? true : false;
          paramFilter === '467' ? true : false;
          return fullUrl.searchParams.get(param);
        },
        getParamStatus: (param: string, value: string) => {
          const protocol = exp.locals.expreq.protocol;
          const host = exp.locals.expreq.hostname;
          const url = exp.locals.expreq.originalUrl;
          const port = 3000;
          const fullUrl = new URL(`${protocol}://${host}:${port}${url}`);
          const paramFilter = fullUrl.searchParams.get(param);
          if (paramFilter === value) {
            return 'selected';
          }
          return '';
        },
        token: () => {
          return exp.locals.expreq.csrfToken();
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
