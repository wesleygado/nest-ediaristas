import { EntityRepository, Repository } from 'typeorm';
import { CreateServiceDto } from './dto/create-servico.dto';
import { Servico } from './entities/servico.entity';

@EntityRepository(Servico)
export class ServicesRepository extends Repository<Servico> {
  async getServices(): Promise<Servico[]> {
    const query = this.createQueryBuilder('servico');
    const services = await query.getMany();
    return services;
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Servico> {
    const {
      name,
      valor_minimo,
      quantidade_horas,
      porcentagem,
      valor_quarto,
      horas_quarto,
      valor_sala,
      horas_sala,
      valor_banheiro,
      horas_banheiro,
      valor_cozinha,
      horas_cozinha,
      valor_quintal,
      horas_quintal,
      valor_outros,
      horas_outros,
      icone,
      posicao,
    } = createServiceDto;
    const service = this.create({
      name,
      valor_minimo,
      quantidade_horas,
      porcentagem,
      valor_quarto,
      horas_quarto,
      valor_sala,
      horas_sala,
      valor_banheiro,
      horas_banheiro,
      valor_cozinha,
      horas_cozinha,
      valor_quintal,
      horas_quintal,
      valor_outros,
      horas_outros,
      icone,
      posicao,
    });

    await this.save(service);
    return service;
  }
}
