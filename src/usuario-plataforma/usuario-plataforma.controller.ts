import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
  UseGuards,
  Redirect,
  UseFilters,
  Request,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './usuario-plataforma.service';
import { CreateUserDto } from './dto/create-usuario-plataforma.dto';
import { UpdateUserDto } from './dto/update-usuario-plataforma.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { CreateException } from 'src/common/filters/create-exceptions.filter';
import { PatchException } from 'src/common/filters/patch-exceptions.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('create')
  @Render('users/create')
  getCreate(@Request() req) {
    return {
      message: req.flash('message'),
      alert: req.flash('alert'),
      userOld: req.flash('old'),
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateException)
  @Post()
  @Redirect('users/index')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('index')
  @Render('users/index')
  async findAll(@Request() req) {
    const users = await this.usersService.findAll();
    return {
      users: users,
      csrfToken: req.csrfToken(),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get(':id/edit')
  @Render('users/edit')
  async updateUser(@Param('id') id: number, @Request() req) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    } else {
      return {
        user: user,
        message: req.flash('message'),
        alert: req.flash('alert'),
        userOld: req.flash('old'),
        csrfToken: req.csrfToken(),
      };
    }
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(PatchException)
  @Patch(':id/edit')
  @Redirect('/users/index')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Delete(':id')
  @Redirect('index')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
