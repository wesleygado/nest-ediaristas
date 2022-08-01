import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from './diarias.repository';
import { UsuarioApiRepository } from 'src/usuario-api/usuario-api.repository';
import { DiariaMapper } from './diaria.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([DiariaRepository]),
    TypeOrmModule.forFeature([UsuarioApiRepository]),
  ],
  controllers: [DiariasController],
  providers: [DiariasService, DiariaMapper],
})
export class DiariasModule {}
