import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-usuario-plataforma.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
