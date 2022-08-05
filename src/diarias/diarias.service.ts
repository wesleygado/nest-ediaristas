import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import DiariaStatus from './diaria-status.enum';
import { DiariasRepository } from './diarias.repository';
import { GetDiariasFilterDto } from './dto/get-diarias-filter.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariasService {
  constructor(private diaria: DiariasRepository) {}
  async findAll(): Promise<Diaria[]> {
    const diarias = await this.diaria.repository.listarDiarias();
    return diarias;
  }

  async getDiariasFilters(filterDto: GetDiariasFilterDto) {
    console.log(filterDto);
    const { status, cliente } = filterDto;
    let diarias = await this.findAll();

    if (status) {
      console.log('ta no filtro do status');
      diarias = diarias.filter((diaria) => {
        if (status.toString().indexOf(diaria.status.toString()) >= 0) {
          return true;
        }
        return false;
      });
    }

    if (cliente) {
      diarias = diarias.filter(
        (diaria) => diaria.cliente.nomeCompleto == cliente,
      );
    }
    return diarias;
  }

  async pagar(id: number) {
    const diaria = await this.buscarDiariaporid(id);
    await this.validarDiariaPagamento(diaria);
    diaria.status = DiariaStatus.TRANSFERIDO;
    await this.diaria.repository.save(diaria);
    return '';
  }
  private async validarDiariaPagamento(diaria: Diaria) {
    if (
      diaria.status === DiariaStatus.CONCLUIDO ||
      diaria.status === DiariaStatus.AVALIADO
    ) {
      return diaria;
    }
    throw new BadRequestException('Diária com status inválido para pagemento');
  }

  private async buscarDiariaporid(id: number) {
    const diaria = await this.diaria.repository.findOneBy({ id: id });
    if (!diaria) {
      throw new NotFoundException();
    }
    return diaria;
  }
}
