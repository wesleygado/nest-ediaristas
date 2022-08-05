import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './servicos.repository';
import { ServicesController } from './servicos.controller';
import { Utils } from 'src/common/utils/utils';

@Injectable()
export class ServicesService {
  constructor(private servico: ServicesRepository, private utils: Utils) {}

  async create(createServiceDto: CreateServiceDto) {
    createServiceDto.valorMinimo = this.utils.formatDecimal(
      createServiceDto.valorMinimo,
    );

    createServiceDto.valorSala = this.utils.formatDecimal(
      createServiceDto.valorSala,
    );

    createServiceDto.valorQuarto = this.utils.formatDecimal(
      createServiceDto.valorQuarto,
    );

    createServiceDto.valorBanheiro = this.utils.formatDecimal(
      createServiceDto.valorBanheiro,
    );

    createServiceDto.valorCozinha = this.utils.formatDecimal(
      createServiceDto.valorCozinha,
    );

    createServiceDto.valorQuintal = this.utils.formatDecimal(
      createServiceDto.valorQuintal,
    );

    createServiceDto.valorOutros = this.utils.formatDecimal(
      createServiceDto.valorOutros,
    );
    return await this.servico.repository.createService(createServiceDto);
  }

  findAll() {
    return this.servico.repository.getServices();
  }

  findOne(id: number) {
    return this.servico.repository.findOneBy({ id: id });
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    const serviceDTO = updateServiceDto;
    serviceDTO.id = service.id;
    serviceDTO.valorSala = this.utils.formatDecimal(updateServiceDto.valorSala);
    serviceDTO.valorQuarto = this.utils.formatDecimal(
      updateServiceDto.valorQuarto,
    );
    serviceDTO.valorMinimo = this.utils.formatDecimal(
      updateServiceDto.valorMinimo,
    );
    serviceDTO.valorBanheiro = this.utils.formatDecimal(
      updateServiceDto.valorBanheiro,
    );
    serviceDTO.valorCozinha = this.utils.formatDecimal(
      updateServiceDto.valorCozinha,
    );
    serviceDTO.valorQuintal = this.utils.formatDecimal(
      updateServiceDto.valorQuintal,
    );
    serviceDTO.valorOutros = this.utils.formatDecimal(
      updateServiceDto.valorOutros,
    );
    await this.servico.repository.save(serviceDTO);

    return service;
  }
}
