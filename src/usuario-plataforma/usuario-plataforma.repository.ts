import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-usuario-plataforma.dto';
import { UsuarioPlataforma } from './entities/usuario-plataforma.entity';

export class UsersRepository {
  constructor(
    @InjectRepository(UsuarioPlataforma)
    private usuarioRepository: Repository<UsuarioPlataforma>,
  ) {}
  repository = this.usuarioRepository.extend({
    async getUsers(): Promise<UsuarioPlataforma[]> {
      const query = this.createQueryBuilder('user');
      const users = await query.getMany();
      return users;
    },

    async createUser(createUserDto: CreateUserDto): Promise<UsuarioPlataforma> {
      const { name, email, password } = createUserDto;
      const user = this.create({
        name,
        email,
        password,
      });

      await this.save(user);
      return user;
    },
  });
}
