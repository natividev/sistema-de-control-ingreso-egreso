import { PartialType } from '@nestjs/mapped-types';
import { CreateBitacoraAportacionDto } from './create-bitacora-aportacion.dto';

export class UpdateBitacoraAportacionDto extends PartialType(CreateBitacoraAportacionDto) {}
