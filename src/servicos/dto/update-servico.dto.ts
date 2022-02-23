import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './create-servico.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
