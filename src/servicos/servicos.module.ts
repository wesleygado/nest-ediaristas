import { Module } from '@nestjs/common';
import { ServicesService } from './servicos.service';
import { ServicesController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesRepository } from './servicos.repository';
import { Utils } from 'src/common/utils/utils';
import { Servico } from './entities/servico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servico])],
  controllers: [ServicesController],
  providers: [ServicesService, Utils, ServicesRepository],
})
export class ServicesModule {}
