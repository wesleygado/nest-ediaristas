import { Command, Positional, Option } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { User } from './entities/usuarios.entity';
import { EntityRepository, Repository } from 'typeorm';
import { UsersService } from './usuarios.service';

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
    password_confirmation: string,
  ) {
    this.usersService.create({
      name,
      email,
      password,
      id: 0,
      password_confirmation,
    });
  }
}
