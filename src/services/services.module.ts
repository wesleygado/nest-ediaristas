import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServicesRepository } from './services.repository';
import { Utils } from 'src/common/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([ServicesRepository])],
  controllers: [ServicesController],
  providers: [ServicesService, Utils],
})
export class ServicesModule {}
