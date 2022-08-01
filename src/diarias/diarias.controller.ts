import {
  Body,
  Controller,
  Get,
  Param,
  Query,
  Redirect,
  Render,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { DiariasService } from './diarias.service';
import { GetDiariasFilterDto } from './dto/get-diarias-filter.dto';

@Controller('diarias')
export class DiariasController {
  constructor(private readonly diariasService: DiariasService) {}
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('index')
  @Render('diarias/index')
  async getDiarias(@Query() filterDto: GetDiariasFilterDto) {
    if (Object.keys(filterDto).length) {
      return {
        diarias: await this.diariasService.getDiariasFilters(filterDto),
      };
    }
    return { diarias: await this.diariasService.findAll() };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get(':id/pagar')
  @Redirect('/diarias/index')
  async pagar(@Param() id: number) {
    return await this.diariasService.pagar(id);
  }
}
