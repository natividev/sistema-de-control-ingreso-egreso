import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoriaProyectoDto } from './create-categoria-proyecto.dto';

export class UpdateCategoriaProyectoDto extends PartialType(CreateCategoriaProyectoDto) {}
