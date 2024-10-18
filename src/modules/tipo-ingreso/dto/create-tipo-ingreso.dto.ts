import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoIngresoDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un string' })
  nombre: string;
}
