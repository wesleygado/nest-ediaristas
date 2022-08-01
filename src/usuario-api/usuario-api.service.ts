import { Injectable } from '@nestjs/common';
import { CreateUsuarioApiDto } from './dto/create-usuario-api.dto';
import { UpdateUsuarioApiDto } from './dto/update-usuario-api.dto';

@Injectable()
export class UsuarioApiService {
  create(createUsuarioApiDto: CreateUsuarioApiDto) {
    return 'This action adds a new usuarioApi';
  }

  findAll() {
    return `This action returns all usuarioApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioApi`;
  }

  update(id: number, updateUsuarioApiDto: UpdateUsuarioApiDto) {
    return `This action updates a #${id} usuarioApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioApi`;
  }
}
