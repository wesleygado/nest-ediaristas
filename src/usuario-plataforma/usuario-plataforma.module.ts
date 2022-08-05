import { Module } from '@nestjs/common';
import { UsersService } from './usuario-plataforma.service';
import { UsersController } from './usuario-plataforma.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioPlataforma } from './entities/usuario-plataforma.entity';
import { UsersRepository } from './usuario-plataforma.repository';
import { Utils } from 'src/common/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioPlataforma])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, Utils],
  exports: [UsersService],
})
export class UsersModule {}
