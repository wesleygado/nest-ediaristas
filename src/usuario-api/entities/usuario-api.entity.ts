import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ synchronize: false })
export class UsuarioApi {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  nomeCompleto: string;

  @Column()
  email: string;

  @Column()
  senha: string;

  @Column()
  tipoUsuario: number;

  @BeforeInsert()
  async setPassword(senha: string) {
    const salt = await bcrypt.genSalt();
    this.senha = await bcrypt.hash(senha || this.senha, salt);
  }
}
