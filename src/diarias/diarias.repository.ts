import { EntityRepository, Repository } from 'typeorm';
import { Diaria } from './entities/diaria.entity';

@EntityRepository(Diaria)
export class DiariaRepository extends Repository<Diaria> {
  async findAll() {
    const diarias = await this.manager.query(
      'SELECT D.id, D.status, U.nome_completo AS cliente, D.diarista_id AS diarista, D.data_atendimento, D.valor_comissao, D.preco FROM diaria D LEFT JOIN usuario_api U ON D.cliente_id = U.id',
    );
    return diarias;
  }
}
