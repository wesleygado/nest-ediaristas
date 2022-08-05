import DiariaStatus from 'src/diarias/diaria-status.enum';
import { Express } from 'express';

export class Helpers {
  async helperHbs(exp: Express) {
    const helpers = {
      menuSuperior: (classe, view1, view2) => {
        const url: string = exp.locals.expreq['originalUrl'];
        if (url === view1 || url === view2) {
          return classe;
        }
        return '';
      },
      menuSubItem: (view) => {
        const url: string = exp.locals.expreq['originalUrl'];
        if (url === view) {
          return 'active';
        }
        return '';
      },
      userMenu: () => {
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
      converterReal: (valor: number) => {
        const formatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        return formatter.format(valor);
      },
      converterData: (data: Date) => {
        const dataAtendimento = new Date(data);
        const horas = String(dataAtendimento.getHours()).padStart(2, '0');
        const minutos = String(dataAtendimento.getMinutes()).padStart(2, '0');
        const segundos = String(dataAtendimento.getSeconds()).padStart(2, '0');
        return `${dataAtendimento.toLocaleDateString(
          'pt-BR',
        )} ${horas}:${minutos}:${segundos}`;
      },
      validarPagamento: (status: number, id: number) => {
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
    };
    return helpers;
  }
}
