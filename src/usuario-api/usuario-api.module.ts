import { Module } from '@nestjs/common';
import { UsuarioApiService } from './usuario-api.service';
import { UsuarioApiController } from './usuario-api.controller';

@Module({
  controllers: [UsuarioApiController],
  providers: [UsuarioApiService],
})
export class UsuarioApiModule {}
