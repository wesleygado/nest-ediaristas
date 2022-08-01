import { UsuarioApi } from 'src/usuario-api/entities/usuario-api.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ synchronize: false })
export class Diaria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  status: number;

  @ManyToOne(() => UsuarioApi, (cliente) => cliente.id, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'cliente_id' })
  cliente: UsuarioApi;

  @ManyToOne(() => UsuarioApi, (diarista) => diarista.id, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'diarista_id' })
  diarista: UsuarioApi;

  @Column({ nullable: false })
  preco: number;

  @Column({ name: 'valor_comissao', nullable: false })
  valorComissao: number;

  @Column({ name: 'data_atendimento', nullable: false })
  dataAtendimento: Date;
}
