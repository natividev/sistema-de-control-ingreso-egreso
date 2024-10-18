import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAportacionDto } from './create-tipo-aportacion.dto';

export class UpdateTipoAportacionDto extends PartialType(CreateTipoAportacionDto) {}
