import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const REGEX_PASSWORD =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

export class CreateAuthDto {
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  usuario: string;

  @IsString()
  @MinLength(8)
  @Matches(REGEX_PASSWORD, {
    message:
      'La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial',
  })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  @Matches(/^[a-zA-ZÀ-ÿ\s]{2,50}$/)
  nombre: string;
}

export class LoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9_-]*$/)
  usuario: string;

  @IsString()
  @MinLength(8)
  @Matches(REGEX_PASSWORD, {
    message:
      'La contraseña debe contener al menos 8 caracteres, una letra, un número y un carácter especial',
  })
  password: string;
}
