import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Render,
  UseFilters,
  Request,
  Redirect,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { ServicesService } from './servicos.service';
import { CreateServiceDto } from './dto/create-servico.dto';
import { UpdateServiceDto } from './dto/update-servico.dto';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { CreateException } from 'src/common/filters/create-exceptions.filter';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('create')
  @Render('services/create')
  getCreate(@Request() req) {
    return {
      serviceOld: req.flash('old'),
      alert: req.flash('alert'),
      message: req.flash('message'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateException)
  @Post()
  @Redirect('services/index')
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('index')
  @Render('services/index')
  async findAll() {
    const services = await this.servicesService.findAll();
    return { services: services };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get(':id/edit')
  @Render('services/edit')
  async findOne(@Param('id') id: number, @Request() req) {
    const service = await this.servicesService.findOne(id);
    if (!service) {
      throw new NotFoundException();
    } else {
      return {
        service: service,
        message: req.flash('message'),
        alert: req.flash('alert'),
        serviceOld: req.flash('old'),
        csrfToken: req.csrfToken(),
      };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('id/edit')
  @Render('services/edit')
  updateService() {
    //
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(PatchException)
  @Patch(':id/edit')
  @Redirect('/services/index')
  async update(
    @Param('id') id: number,
    @Body() updateServiceDto: UpdateServiceDto,
  ) {
    return await this.servicesService.update(id, updateServiceDto);
  }
}
