import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsInt,
  IsOptional,
} from 'class-validator';

export class CreateIngresoDto {
  @IsNotEmpty()
  @IsString()
  nombreActividad: string;

  @IsNotEmpty()
  @IsDate()
  fechaActividad: Date;

  @IsNotEmpty()
  @IsNumber()
  cantidad: number;

  @IsNotEmpty()
  @IsNumber()
  idAfiliado?: number;

  @IsOptional()
  @IsString()
  noTransaccion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNotEmpty()
  @IsInt()
  fkTipoIngreso: number;

  @IsNotEmpty()
  @IsInt()
  fkTipoControl: number;

  @IsNotEmpty()
  @IsInt()
  fkTipoAportacion: number;

  @IsNotEmpty()
  @IsInt()
  fkTipoAfiliado: number;
}
