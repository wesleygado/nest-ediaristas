import { Module } from '@nestjs/common';
import { DiariasService } from './diarias.service';
import { DiariasController } from './diarias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiariaRepository } from './diarias.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DiariaRepository])],
  controllers: [DiariasController],
  providers: [DiariasService],
})
export class DiariasModule {}
