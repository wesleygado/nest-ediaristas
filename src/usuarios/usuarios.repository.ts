import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UsuarioPlataforma } from './entities/usuarios.entity';

@EntityRepository(UsuarioPlataforma)
export class UsersRepository extends Repository<UsuarioPlataforma> {
  async getUsers(): Promise<UsuarioPlataforma[]> {
    const query = this.createQueryBuilder('user');
    const users = await query.getMany();
    return users;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UsuarioPlataforma> {
    const { name, email, password } = createUserDto;
    const user = this.create({
      name,
      email,
      password,
    });

    await this.save(user);
    return user;
  }
}
