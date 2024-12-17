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

  async liquidacionConAnulacionEgreso(id: number) {
    await this.prisma.egreso.update({
      where: {
        id: id,
      },
      data: {
        anulado: true,
      },
    });

    await this.prisma.total_log.updateMany({
      where: {
        fk_egreso: id,
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
    const getTotalLogIngreso = await this.getTotalLogIngreso(id);

    await this.prisma.total_ingreso.update({
      where: {
        id: 1,
      },
      data: {
        monto: totalOperativoDeIngreso.monto - monto,
      },
    });

    await this.prisma.total_log.updateMany({
      where: {
        fk_ingreso: id,
      },
      data: {
        monto_nuevo: getTotalLogIngreso.monto_nuevo - monto,
        monto_ingreso: getTotalLogIngreso.monto_ingreso - monto,
      },
    });
  }

  // TODO: ANULACIÓN EGRESO
  async anularEgreso(id: number, monto: number, motivo: string) {
    const egreso = await this.getEgresoById(id);

    await this.prisma.egreso.update({
      where: {
        id: id,
      },
      data: {
        cantidad: egreso.cantidad - monto,
      },
    });

    await this.prisma.log_anulacion.create({
      data: {
        monto_original: egreso.cantidad,
        monto_anulado: monto,
        fk_egreso: id,
        tipo_anulacion: 'EGRESO',
        motivo_anulacion: motivo,
        active: true,
      },
    });

    const totalOperativoDeEgreso = await this.getTotalEgreso();
    const totalIngreso = await this.getTotalIngreso();

    await this.prisma.total_egreso.update({
      where: {
        id: 1,
      },
      data: {
        monto: totalOperativoDeEgreso.monto - monto,
      },
    });

    await this.prisma.total_ingreso.update({
      where: {
        id: 1,
      },
      data: {
        monto: totalIngreso.monto + monto,
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

  private async getTotalLogIngreso(id: number) {
    return await this.prisma.total_log.findFirst({
      where: {
        fk_ingreso: id,
      },
      select: {
        monto_nuevo: true,
        monto_ingreso: true,
      },
    });
  }

  private async getTotalEgreso() {
    return await this.prisma.total_egreso.findUnique({
      where: {
        id: 1,
      },
      select: {
        monto: true,
      },
    });
  }
}
