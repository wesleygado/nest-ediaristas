import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariasRepository } from './diarias.repository';
import { Diaria } from './entities/diaria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Diaria])],
  controllers: [DiariasController],
  providers: [DiariasService, DiariasRepository],
  exports: [DiariasService],
})
export class DiariasModule {}
