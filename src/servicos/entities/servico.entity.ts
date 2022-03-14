import { Utils } from 'src/common/utils/utils';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Servico {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  valor_minimo: number;

  @Column()
  quantidade_horas: number;

  @Column()
  porcentagem: number;

  @Column()
  valor_quarto: number;

  @Column()
  horas_quarto: number;

  @Column()
  valor_sala: number;

  @Column()
  horas_sala: number;

  @Column()
  valor_banheiro: number;

  @Column()
  horas_banheiro: number;

  @Column()
  valor_cozinha: number;

  @Column()
  horas_cozinha: number;

  @Column()
  valor_quintal: number;

  @Column()
  horas_quintal: number;

  @Column()
  valor_outros: number;

  @Column()
  horas_outros: number;

  @Column()
  icone: string;

  @Column()
  posicao: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updated_at: Date;
}
