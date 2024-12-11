import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';

export class FilterQueryParams {
  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  readonly page?: number = 1;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Min(1)
  readonly limit?: number = 25;

  @IsOptional()
  @IsDateString()
  readonly desde?: string;

  @IsOptional()
  @IsDateString()
  readonly hasta?: string;
}
