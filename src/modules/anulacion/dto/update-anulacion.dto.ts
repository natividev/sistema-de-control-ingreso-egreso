import { PartialType } from '@nestjs/mapped-types';
import { CreateAnulacionDto } from './create-anulacion.dto';

export class UpdateAnulacionDto extends PartialType(CreateAnulacionDto) {}
