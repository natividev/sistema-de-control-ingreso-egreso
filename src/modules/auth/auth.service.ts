import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { IUser } from './interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async validateUser(usuario: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        usuario,
      },
    });

    const isValid = await bcrypt.compare(password, user.password);

    if (user && isValid) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: IUser) {
    const usuario = await this.getUserById(user.usuario);

    if (!usuario) {
      return {
        message: 'Usuario o contraseña incorrectos',
      };
    }

    const validateUser = await this.validateUser(user.usuario, user.password);
    if (!validateUser) {
      return {
        message: 'Usuario o contraseña incorrectos',
      };
    }

    const payload = { sub: usuario.id, username: user.usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async getUserById(usuario: string) {
    return await this.prisma.user.findUnique({
      where: {
        usuario,
      },
    });
  }

  async register({ password, usuario, nombre }: CreateAuthDto) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.prisma.user.create({
      data: {
        usuario,
        password: hashedPassword,
        nombre,
      },
      select: {
        id: true,
      },
    });

    return {
      message: 'Registro exitoso de usuario',
    };
  }
}
