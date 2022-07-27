import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ synchronize: false })
export class Diaria {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  status: number;
}
