import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseFilters,
  Request,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { CreateServiceException } from 'src/common/filters/create-service-excepetions.filter';
import { PatchServiceException } from 'src/common/filters/patch-service-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('create')
  @Render('services/create')
  getCreate(@Request() req) {
    return {
      message: req.flash('message'),
      alert: req.flash('alert'),
      service_name: req.flash('service_name'),
      service_valor_minimo: req.flash('service_valor_minimo'),
      service_quantidade_horas: req.flash('service_quantidade_horas'),
      service_porcentagem: req.flash('service_porcentagem'),
      service_valor_quarto: req.flash('service_valor_quarto'),
      service_horas_quarto: req.flash('service_horas_quarto'),
      service_valor_sala: req.flash('service_valor_sala'),
      service_horas_sala: req.flash('service_horas_sala'),
      service_valor_banheiro: req.flash('service_valor_banheiro'),
      service_horas_banheiro: req.flash('service_horas_banheiro'),
      service_valor_cozinha: req.flash('service_valor_cozinha'),
      service_horas_cozinha: req.flash('service_horas_cozinha'),
      service_valor_quintal: req.flash('service_valor_quintal'),
      service_horas_quintal: req.flash('service_horas_quintal'),
      service_valor_outros: req.flash('service_valor_outros'),
      service_horas_outros: req.flash('service_horas_outros'),
      service_icone: req.flash('service_icone'),
      service_posicao: req.flash('service_posicao'),
    };
  }

  @UseFilters(CreateServiceException)
  @UseGuards(AuthenticatedGuard)
  @Post()
  @Redirect('services/index')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('index')
  @Render('services/index')
  async findAll() {
    const services = await this.servicesService.findAll();
    return { services: services };
  }

  @UseGuards(AuthenticatedGuard)
  @Get(':id/edit')
  @Render('services/edit')
  async findOne(@Param('id') id: number, @Request() req) {
    const service = await this.servicesService.findOne(id);
    return {
      service: service,
      message: req.flash('message'),
      alert: req.flash('alert'),
      service_name: req.flash('service_name'),
      service_valor_minimo: req.flash('service_valor_minimo'),
      service_quantidade_horas: req.flash('service_quantidade_horas'),
      service_porcentagem: req.flash('service_porcentagem'),
      service_valor_quarto: req.flash('service_valor_quarto'),
      service_horas_quarto: req.flash('service_horas_quarto'),
      service_valor_sala: req.flash('service_valor_sala'),
      service_horas_sala: req.flash('service_horas_sala'),
      service_valor_banheiro: req.flash('service_valor_banheiro'),
      service_horas_banheiro: req.flash('service_horas_banheiro'),
      service_valor_cozinha: req.flash('service_valor_cozinha'),
      service_horas_cozinha: req.flash('service_horas_cozinha'),
      service_valor_quintal: req.flash('service_valor_quintal'),
      service_horas_quintal: req.flash('service_horas_quintal'),
      service_valor_outros: req.flash('service_valor_outros'),
      service_horas_outros: req.flash('service_horas_outros'),
      service_icone: req.flash('service_icone'),
      service_posicao: req.flash('service_posicao'),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('id/edit')
  @Render('services/edit')
  updateService() {
    //
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(PatchServiceException)
  @Patch(':id/edit')
  @Redirect('/services/index')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.servicesService.update(id, updateServiceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(+id);
  }
}
