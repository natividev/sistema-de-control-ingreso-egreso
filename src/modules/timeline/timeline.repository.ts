import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EgresoTimeLine, IngresoTimeLine } from './interface';

@Injectable()
export class TimelineRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getIngreso(id: number): Promise<IngresoTimeLine[]> {
    const query = Prisma.sql`select
        i.nombre_actividad as nombreActividad,
        tl.monto_nuevo as montoOriginalSinAlterar,
        DATE_FORMAT(tl.fecha, '%Y-%m-%d') as fecha,
        la.monto_original as montoOriginal,
        la.monto_anulado as montoAnulacion,
        la.motivo_anulacion as motivoAnulacion
      from
        ingreso i
      join log_anulacion la ON
        la.fk_ingreso = i.id
      join total_log tl ON
        tl.fk_ingreso = i.id
      where i.id = ${id}
    `;

    return await this.prisma.$queryRaw<IngresoTimeLine[]>(query);
  }

  async getEgreso(id: number): Promise<EgresoTimeLine[]> {
    const query = Prisma.sql`select
        e.nombre_actividad as nombreActividad,
        tl.monto_nuevo as montoOriginalSinAlterar,
        DATE_FORMAT(tl.fecha, '%Y-%m-%d') as fecha,
        la.monto_original as montoOriginal,
        la.monto_anulado as montoAnulacion,
        la.motivo_anulacion as motivoAnulacion
      from
        egreso e
      join log_anulacion la ON
        la.fk_egreso = e.id
      join total_log tl ON
        tl.fk_ingreso = e.id
      where e.id = ${id}
    `;

    return await this.prisma.$queryRaw<EgresoTimeLine[]>(query);
  }
}
