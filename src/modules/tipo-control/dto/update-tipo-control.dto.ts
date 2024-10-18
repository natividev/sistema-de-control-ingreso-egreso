import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoControlDto } from './create-tipo-control.dto';

export class UpdateTipoControlDto extends PartialType(CreateTipoControlDto) {}
