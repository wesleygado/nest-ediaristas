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

  @Get('create')
  @Render('services/create')
  getCreate(@Request() req) {
    return {
      service_old: req.flash('service'),
      alert: req.flash('alert'),
      message: req.flash('message'),
      user: req.user,
    };
  }

  @UseFilters(CreateServiceException)
  @Post()
  @Redirect('services/index')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get('index')
  @Render('services/index')
  async findAll(@Request() req) {
    const services = await this.servicesService.findAll();
    return { services: services, user: req.user, };
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
      service_old: req.flash('service'),
      user: req.user
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
