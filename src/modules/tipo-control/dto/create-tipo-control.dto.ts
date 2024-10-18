import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoControlDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio' })
  @IsString({ message: 'El nombre debe ser un string' })
  nombre: string;
}
