import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUserDto } from './dto/update-usuario-plataforma.dto';
import { UsersRepository } from './usuario-plataforma.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private usuario: UsersRepository) {}
  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new BadRequestException(`Senha não confere`);
    } else if (!user) {
      createUserDto.password = await this.setPassword(createUserDto.password);
      return this.usuario.repository.save(createUserDto);
    } else {
      throw new BadRequestException(`Email já cadastrado`);
    }
  }

  findAll() {
    return this.usuario.repository.find();
  }

  findOne(id?: number) {
    return this.usuario.repository.findOneBy({ id: id });
  }

  findUserByEmail(email: string) {
    return this.usuario.repository.findOneBy({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const email = await this.findUserByEmail(updateUserDto.email);

    if (updateUserDto.password !== updateUserDto.passwordConfirmation) {
      throw new BadRequestException(`Senha não confere`);
    } else if (!email || email.email === user.email) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.password = await this.setPassword(updateUserDto.password);
      await this.usuario.repository.save(user);
      return user;
    } else if (email.email !== user.email) {
      throw new BadRequestException(`Email já cadastrado`);
    }
  }

  async remove(id: number) {
    const result = await this.usuario.repository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Nenhum ID encontrado`);
    }
  }

  private async setPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
  }
}
