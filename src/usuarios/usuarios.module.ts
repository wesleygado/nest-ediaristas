import { Module } from '@nestjs/common';
import { UsersService } from './usuarios.service';
import { UsersController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './usuarios.repository';
import { Utils } from 'src/common/utils/utils';

@Module({
  imports: [TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, Utils],
  exports: [UsersService],
})
export class UsersModule {}
