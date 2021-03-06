import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-usuario.dto';
import { UpdateUserDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './usuarios.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.findUserByEmail(createUserDto.email);

    if (createUserDto.password !== createUserDto.passwordConfirmation) {
      throw new BadRequestException(`Senha não confere`);
    } else if (!user) {
      return this.usersRepository.createUser(createUserDto);
    } else {
      throw new BadRequestException(`Email já cadastrado`);
    }
  }

  findAll() {
    return this.usersRepository.getUsers();
  }

  findOne(id?: number) {
    return this.usersRepository.findOne(id);
  }

  findUserByEmail(email: string) {
    return this.usersRepository.findOne({ email: email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    const email = await this.findUserByEmail(updateUserDto.email);

    if (updateUserDto.password !== updateUserDto.passwordConfirmation) {
      throw new BadRequestException(`Senha não confere`);
    } else if (email === undefined || email.email === user.email) {
      user.name = updateUserDto.name;
      user.email = updateUserDto.email;
      user.password = updateUserDto.password;
      await this.usersRepository.save(user);
      return user;
    } else if (email.email !== user.email) {
      throw new BadRequestException(`Email já cadastrado`);
    }
  }

  async remove(id: number) {
    const result = await this.usersRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Nenhum ID encontrado`);
    }
  }
}
