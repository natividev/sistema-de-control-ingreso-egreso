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

  @IsOptional()
  @IsString()
  razon?: string;

  @IsOptional()
  @IsString()
  dui?: string;

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
}
