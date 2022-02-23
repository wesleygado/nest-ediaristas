import { Module } from '@nestjs/common';
import { ServicesService } from './servicos.service';
import { ServicesController } from './servicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesRepository } from './servicos.repository';
import { Utils } from 'src/common/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesRepository])],
  controllers: [ServicesController],
  providers: [ServicesService, Utils],
})
export class ServicesModule {}
