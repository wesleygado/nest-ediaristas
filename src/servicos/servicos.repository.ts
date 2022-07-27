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
      valorMinimo,
      quantidadeHoras,
      porcentagem,
      valorQuarto,
      horasQuarto,
      valorSala,
      horasSala,
      valorBanheiro,
      horasBanheiro,
      valorCozinha,
      horasCozinha,
      valorQuintal,
      horasQuintal,
      valorOutros,
      horasOutros,
      icone,
      posicao,
    } = createServiceDto;
    const service = this.create({
      name,
      valorMinimo,
      quantidadeHoras,
      porcentagem,
      valorQuarto,
      horasQuarto,
      valorSala,
      horasSala,
      valorBanheiro,
      horasBanheiro,
      valorCozinha,
      horasCozinha,
      valorQuintal,
      horasQuintal,
      valorOutros,
      horasOutros,
      icone,
      posicao,
    });

    await this.save(service);
    return service;
  }
}
