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
  valorMinimo: number;

  @Column()
  quantidadeHoras: number;

  @Column()
  porcentagem: number;

  @Column()
  valorQuarto: number;

  @Column()
  horasQuarto: number;

  @Column()
  valorSala: number;

  @Column()
  horasSala: number;

  @Column()
  valorBanheiro: number;

  @Column()
  horasBanheiro: number;

  @Column()
  valorCozinha: number;

  @Column()
  horasCozinha: number;

  @Column()
  valorQuintal: number;

  @Column()
  horasQuintal: number;

  @Column()
  valorOutros: number;

  @Column()
  horasOutros: number;

  @Column()
  icone: string;

  @Column()
  posicao: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  public updatedAt: Date;
}
