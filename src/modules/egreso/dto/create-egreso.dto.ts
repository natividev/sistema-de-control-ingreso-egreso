import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsNumber,
  IsInt,
  IsOptional,
} from 'class-validator';
export class CreateEgresoDto {
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
  idAfiliado: number;

  @IsOptional()
  @IsString()
  noTransaccion?: string;

  @IsOptional()
  @IsString()
  observaciones?: string;

  @IsNotEmpty()
  @IsInt()
  fkTipoControl: number;

  @IsNotEmpty()
  @IsInt()
  fkTipoAportacion: number;
}
