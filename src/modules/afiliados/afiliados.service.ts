import { Injectable } from '@nestjs/common';
import { CreateAfiliadoDto } from './dto/create-afiliado.dto';
import { UpdateAfiliadoDto } from './dto/update-afiliado.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AfiliadosService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAfiliadoDto: CreateAfiliadoDto) {
    const {
      correo,
      fecha,
      nombre,
      numeroDocumento,
      observaciones,
      telefono,
      tipoDocumento,
      idAfiliado,
    } = createAfiliadoDto;

    await this.prisma.registro_afiliado.create({
      data: {
        razon_social: nombre,
        numero_documento: numeroDocumento,
        fecha: new Date(fecha),
        correo: correo,
        telefono: telefono,
        observaciones: observaciones,
        afiliado: {
          connect: {
            id: idAfiliado,
          },
        },
        documento: {
          connect: {
            id: tipoDocumento,
          },
        },
      },
    });

    return {
      message: 'Afiliado creado',
    };
  }

  async findAll() {
    return await this.prisma.afiliados.findMany();
  }

  async findAllAfiliados() {
    return await this.prisma.registro_afiliado.findMany();
  }

  async findTipoAfiliados(tipoAfiliado: number) {
    return await this.prisma.registro_afiliado.findMany({
      where: {
        fk_afiliado: tipoAfiliado,
      },
      select: {
        id: true,
        razon_social: true,
        numero_documento: true,
        telefono: true,
        fk_tipo_documento: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} afiliado`;
  }

  update(id: number, updateAfiliadoDto: UpdateAfiliadoDto) {
    return `This action updates a #${id} afiliado`;
  }

  remove(id: number) {
    return `This action removes a #${id} afiliado`;
  }
}
