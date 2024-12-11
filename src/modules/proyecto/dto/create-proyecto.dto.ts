import {
  IsString,
  IsInt,
  IsArray,
  IsOptional,
  ValidateNested,
  IsObject,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class Ubicacion {
  @IsNumber()
  latitud: number;

  @IsNumber()
  longitud: number;
}

export class CreateProyectoDto {
  @IsString()
  nombre: string;

  @IsString()
  fecha: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => Ubicacion)
  @IsObject()
  ubicacion?: Ubicacion;

  @IsInt()
  cantidad: number;

  @IsOptional()
  @IsString()
  observacion?: string;

  @IsArray()
  @IsOptional()
  tipoParticipante: string[] | null;

  @IsInt()
  categoriaProyectoId: number;
}
