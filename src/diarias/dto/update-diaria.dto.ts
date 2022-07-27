import { PartialType } from '@nestjs/mapped-types';
import { CreateDiariaDto } from './create-diaria.dto';

export class UpdateDiariaDto extends PartialType(CreateDiariaDto) {}
