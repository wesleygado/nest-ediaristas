import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { UsuarioPlataforma } from './entities/usuario-plataforma.entity';
import { UsersService } from './usuario-plataforma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCommand {
  constructor(private readonly usersService: UsersService) {}
  @Command({
    command: 'create: <username>',
    describe: 'criar primeiro usuário',
  })
  async create(
    @Positional({
      name: 'username',
      describe: 'the username',
      type: 'string',
    })
    name: string,
    @Option({
      name: 'email',
      describe: 'email',
      type: 'string',
      required: true,
    })
    email: string,
    @Option({
      name: 'password',
      describe: 'senha',
      type: 'string',
      required: true,
    })
    password: string,
    @Option({
      name: 'password_confirmation',
      describe: 'confirmação de senha',
      type: 'string',
      required: true,
    })
    passwordConfirmation: string,
  ) {
    this.usersService.create({
      name,
      email,
      password,
      id: 0,
      passwordConfirmation,
    });
  }
}
