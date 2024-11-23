import { IsDateString } from 'class-validator';

export class ParamsDto {
  @IsDateString()
  desde: string;

  @IsDateString()
  hasta: string;
}
