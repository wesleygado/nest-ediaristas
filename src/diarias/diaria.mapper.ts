import { InjectRepository } from '@nestjs/typeorm';
import { UsuarioApiRepository } from 'src/usuario-api/usuario-api.repository';
import { DiariaRepository } from './diarias.repository';
import { DiariaMapperDto } from './dto/diaria.mapper.dto';
import { Diaria } from './entities/diaria.entity';

export class DiariaMapper {
  constructor(
    @InjectRepository(UsuarioApiRepository)
    private usuarioRepository: UsuarioApiRepository,
  ) {}
  async toListDiaria(diaria) {
    const diariaView = new DiariaMapperDto();
    diariaView.id = diaria.id;
    diariaView.status = diaria.status;
    diariaView.nomeCliente = diaria.cliente;
    diariaView.nomeDiarista = await this.buscarNomeDiarista(diaria.diarista);
    diariaView.dataAtendimento = this.convertDataAtendimento(
      diaria.data_atendimento,
    );
    diariaView.preco = diaria.preco;
    diariaView.comissao = diaria.valor_comissao;
    return diariaView;
  }

  private convertDataAtendimento(data: Date): string {
    const dataAtendimento = new Date(data);
    const horas = String(dataAtendimento.getHours()).padStart(2, '0');
    const minutos = String(dataAtendimento.getMinutes()).padStart(2, '0');
    const segundos = String(dataAtendimento.getSeconds()).padStart(2, '0');
    return `${dataAtendimento.toLocaleDateString(
      'pt-BR',
    )} ${horas}:${minutos}:${segundos}`;
  }

  private async buscarNomeDiarista(id: number): Promise<string> {
    const diarista = await this.usuarioRepository.findOne({ id: id });
    if (!diarista) {
      return null;
    }
    return diarista.nomeCompleto;
  }
}
