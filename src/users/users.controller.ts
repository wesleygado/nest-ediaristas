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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { CreateUserException } from 'src/common/filters/create-user-exceptions.filter';
import { PatchUserException } from 'src/common/filters/patch-user-exceptions.filter';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UseGuards(AuthenticatedGuard)
  @UseFilters(AuthExceptionFilter)
  @Get('create')
  @Render('users/create')
  getCreate(@Request() req) {
    return {
      user: req.user,
      message: req.flash('message'),
      alert: req.flash('alert'),
      user_old: req.flash('user'),
    };
  }

  @UseGuards(AuthenticatedGuard)
  @UseFilters(CreateUserException)
  @UseFilters(AuthExceptionFilter)
  @Post()
  @Redirect('users/index')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(AuthenticatedGuard)
  @Get('index')
  @Render('users/index')
  async findAll(@Request() req) {
    const users = await this.usersService.findAll();
    return { users: users, user: req.user };
  }

  @UseFilters(AuthExceptionFilter)
  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseFilters(AuthExceptionFilter)
  @Get(':id/edit')
  @Render('users/edit')
  async updateUser(@Param('id') id: string, @Request() req) {
    const user = await this.usersService.findOne(id);
    return {
      user: user,
      message: req.flash('message'),
      alert: req.flash('alert'),
      user_old: req.flash('user'),
    };
  }

  @UseFilters(PatchUserException)
  @Patch(':id/edit')
  @Redirect('/users/index')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  @Redirect('index')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
