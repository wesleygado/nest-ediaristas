import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsuarioApiService } from './usuario-api.service';
import { CreateUsuarioApiDto } from './dto/create-usuario-api.dto';
import { UpdateUsuarioApiDto } from './dto/update-usuario-api.dto';

@Controller('usuario-api')
export class UsuarioApiController {
  constructor(private readonly usuarioApiService: UsuarioApiService) {}

  @Post()
  create(@Body() createUsuarioApiDto: CreateUsuarioApiDto) {
    return this.usuarioApiService.create(createUsuarioApiDto);
  }

  @Get()
  findAll() {
    return this.usuarioApiService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioApiService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUsuarioApiDto: UpdateUsuarioApiDto,
  ) {
    return this.usuarioApiService.update(+id, updateUsuarioApiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioApiService.remove(+id);
  }
}
