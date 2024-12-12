import { IsNumber, IsPositive, IsString, Min } from 'class-validator';

export class CreateAnulacionDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @IsPositive()
  @Min(1)
  monto: number;

  @IsString()
  motivo?: string;
}
