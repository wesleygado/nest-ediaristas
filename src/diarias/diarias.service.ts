import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager } from 'typeorm';
import DiariaStatus from './diaria-status.enum';
import { DiariaRepository } from './diarias.repository';
import { CreateDiariaDto } from './dto/create-diaria.dto';
import { UpdateDiariaDto } from './dto/update-diaria.dto';
import { Diaria } from './entities/diaria.entity';

@Injectable()
export class DiariasService {
  constructor(
    @InjectRepository(DiariaRepository)
    private diariaRepository: DiariaRepository,
  ) {}
  async findAll() {
    return this.diariaRepository.findAll();
  }

  async pagar(id: number) {
    const diaria = await this.buscarDiariaporid(id);
    await this.validarDiariaPagamento(diaria);
    diaria.status = DiariaStatus.TRANSFERIDO;
    await this.diariaRepository.save(diaria);
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
    const diaria = await this.diariaRepository.findOne(id);
    if (!diaria) {
      throw new NotFoundException();
    }
    return diaria;
  }
}
