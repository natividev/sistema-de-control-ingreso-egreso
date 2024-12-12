import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AnulacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async liquidacionConAnulacionIngreso(id: number) {
    await this.prisma.ingreso.update({
      where: {
        id: id,
      },
      data: {
        anulado: true,
      },
    });

    await this.prisma.total_log.updateMany({
      where: {
        fk_ingreso: id,
      },
      data: {
        anulado: true,
        fecha_anulacion: new Date(),
      },
    });
  }

  async anularIngreso(id: number, monto: number, motivo: string) {
    const ingreso = await this.getIngresoById(id);

    await this.prisma.ingreso.update({
      where: {
        id: id,
      },
      data: {
        cantidad: ingreso.cantidad - monto,
      },
    });

    await this.prisma.log_anulacion.create({
      data: {
        monto_original: ingreso.cantidad,
        monto_anulado: monto,
        fk_ingreso: id,
        tipo_anulacion: 'INGRESO',
        motivo_anulacion: motivo,
        active: true,
      },
    });

    const totalOperativoDeIngreso = await this.getTotalIngreso();

    await this.prisma.total_ingreso.update({
      where: {
        id: 1,
      },
      data: {
        monto: totalOperativoDeIngreso.monto - monto,
      },
    });
  }

  async getIngresoById(id: number) {
    return await this.prisma.ingreso.findUnique({
      where: {
        id: id,
      },
      select: {
        cantidad: true,
      },
    });
  }

  async getEgresoById(id: number) {
    return await this.prisma.egreso.findUnique({
      where: {
        id: id,
      },
      select: {
        cantidad: true,
      },
    });
  }

  private async getTotalIngreso() {
    return await this.prisma.total_ingreso.findUnique({
      where: {
        id: 1,
      },
      select: {
        monto: true,
      },
    });
  }
}
