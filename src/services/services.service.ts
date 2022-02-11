import { Injectable } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ServicesRepository } from './services.repository';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(ServicesRepository)
    private servicesRepository: ServicesRepository,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
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

    service.name = updateServiceDto.name;
    service.valor_minimo = updateServiceDto.valor_minimo;
    service.quantidade_horas = updateServiceDto.quantidade_horas;
    service.porcentagem = updateServiceDto.porcentagem;
    service.valor_quarto = updateServiceDto.valor_quarto;
    service.horas_quarto = updateServiceDto.horas_quarto;
    service.valor_sala = updateServiceDto.valor_sala;
    service.horas_sala = updateServiceDto.horas_sala;
    service.valor_banheiro = updateServiceDto.valor_banheiro;
    service.horas_banheiro = updateServiceDto.horas_banheiro;
    service.valor_cozinha = updateServiceDto.valor_cozinha;
    service.horas_cozinha = updateServiceDto.horas_cozinha;
    service.valor_quintal = updateServiceDto.valor_quintal;
    service.horas_quintal = updateServiceDto.horas_quintal;
    service.valor_outros = updateServiceDto.valor_outros;
    service.horas_outros = updateServiceDto.horas_outros;
    service.icone = updateServiceDto.icone;
    service.posicao = updateServiceDto.posicao;

    await this.servicesRepository.save(service);

    return service;
  }

  remove(id: number) {
    return `This action removes a #${id} service`;
  }
}
