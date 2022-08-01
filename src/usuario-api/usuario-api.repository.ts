import { EntityRepository, Repository } from 'typeorm';
import { UsuarioApi } from './entities/usuario-api.entity';

@EntityRepository(UsuarioApi)
export class UsuarioApiRepository extends Repository<UsuarioApi> {}
