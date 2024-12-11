import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AporteProyecto } from './interfaces/create-bitacora-de-aportacion';

@Injectable()
export class BitacoraAportacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBitacora(createBitacoraAportacionDto: AporteProyecto) {
    console.log(createBitacoraAportacionDto);
    await this.prisma.aporte_proyecto.create({
      data: createBitacoraAportacionDto,
    });

    return {
      message: 'Bitacora creada correctamente',
    };
  }
}
