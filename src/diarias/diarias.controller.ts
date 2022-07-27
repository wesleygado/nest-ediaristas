import { Body, Controller, Get, Param, Redirect, Render } from '@nestjs/common';
import { DiariasService } from './diarias.service';

@Controller('diarias')
export class DiariasController {
  constructor(private readonly diariasService: DiariasService) {}
  @Get('index')
  @Render('diarias/index')
  async findAll() {
    const diarias = await this.diariasService.findAll();
    return { diarias: diarias };
  }
  @Get(':id/pagar')
  @Redirect('/diarias/index')
  async pagar(@Param() id: number) {
    return await this.diariasService.pagar(id);
  }
}
