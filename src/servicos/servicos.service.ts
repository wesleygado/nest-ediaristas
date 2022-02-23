import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './servicos.repository';
import { ServicesController } from './servicos.controller';
import { Utils } from 'src/common/utils/utils';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private servicesRepository: ServicesRepository,
    private utils: Utils,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    createServiceDto.valor_minimo = this.utils.formatDecimal(
      createServiceDto.valor_minimo,
    );

    createServiceDto.valor_sala = this.utils.formatDecimal(
      createServiceDto.valor_sala,
    );

    createServiceDto.valor_quarto = this.utils.formatDecimal(
      createServiceDto.valor_quarto,
    );

    createServiceDto.valor_banheiro = this.utils.formatDecimal(
      createServiceDto.valor_banheiro,
    );

    createServiceDto.valor_cozinha = this.utils.formatDecimal(
      createServiceDto.valor_cozinha,
    );

    createServiceDto.valor_quintal = this.utils.formatDecimal(
      createServiceDto.valor_quintal,
    );

    createServiceDto.valor_outros = this.utils.formatDecimal(
      createServiceDto.valor_outros,
    );
    return await this.servicesRepository.createService(createServiceDto);
  }

  findAll() {
    return this.servicesRepository.getServices();
  }

  findOne(id: number) {
    return this.servicesRepository.findOne(id);
  }

  async update(id: number, updateServiceDto: UpdateServiceDto) {
    const service = await this.findOne(id);
    const serviceDTO = updateServiceDto;
    serviceDTO.id = service.id;
    serviceDTO.valor_sala = this.utils.formatDecimal(
      updateServiceDto.valor_sala,
    );
    serviceDTO.valor_quarto = this.utils.formatDecimal(
      updateServiceDto.valor_quarto,
    );
    serviceDTO.valor_minimo = this.utils.formatDecimal(
      updateServiceDto.valor_minimo,
    );
    serviceDTO.valor_banheiro = this.utils.formatDecimal(
      updateServiceDto.valor_banheiro,
    );
    serviceDTO.valor_cozinha = this.utils.formatDecimal(
      updateServiceDto.valor_cozinha,
    );
    serviceDTO.valor_quintal = this.utils.formatDecimal(
      updateServiceDto.valor_quintal,
    );
    serviceDTO.valor_outros = this.utils.formatDecimal(
      updateServiceDto.valor_outros,
    );
    await this.servicesRepository.save(serviceDTO);

    return service;
  }
}
