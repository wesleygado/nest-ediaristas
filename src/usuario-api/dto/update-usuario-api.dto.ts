import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioApiDto } from './create-usuario-api.dto';

export class UpdateUsuarioApiDto extends PartialType(CreateUsuarioApiDto) {}
