import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBitacoraAportacionDto {
  @IsString()
  fecha: string;

  @IsString()
  nombrePersona: string;

  @IsNumber()
  proyectoId: number;

  @IsNumber()
  tipoAporteId: number;

  @IsString()
  cantidad: string;

  @IsString()
  @IsOptional()
  observaciones: string;
}
