import { IsString } from 'class-validator';

export class CreateAuthDto {
  @IsString()
  usuario: string;

  @IsString()
  password: string;

  @IsString()
  nombre: string;
}

export class LoginDto {
  @IsString()
  usuario: string;

  @IsString()
  password: string;
}
