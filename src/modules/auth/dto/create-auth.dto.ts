import { IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  usuario: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  nombre: string;
}

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  usuario: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  password: string;
}
