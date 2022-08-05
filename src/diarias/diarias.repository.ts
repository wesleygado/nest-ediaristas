import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Diaria } from './entities/diaria.entity';

export class DiariasRepository {
  constructor(
    @InjectRepository(Diaria)
    private diariaRepository: Repository<Diaria>,
  ) {}
  repository = this.diariaRepository.extend({
    async listarDiarias(): Promise<Diaria[]> {
      const diarias = await this.createQueryBuilder('diaria')
        .select('diaria')
        .leftJoinAndSelect('diaria.cliente', 'cliente')
        .leftJoinAndSelect('diaria.diarista', 'diarista')
        .getMany();
      return diarias;
    },
  });
}
