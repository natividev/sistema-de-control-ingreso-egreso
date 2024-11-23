import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateAfiliadoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  tipoDocumento: number;

  @IsString()
  numeroDocumento: string;

  @IsString()
  fecha: string;

  @IsNumber()
  idAfiliado: number;

  @IsEmail()
  correo: string;

  @IsString()
  telefono: string;

  @IsString()
  observaciones: string;
}
