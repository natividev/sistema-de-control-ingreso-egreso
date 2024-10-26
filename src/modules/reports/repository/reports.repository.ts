import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { IReportGeneralIngresoEgreso, IReportIngreso } from '../interfaces';

@Injectable()
export class ReportsRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async reportIngresoHistorico(): Promise<IReportIngreso[]> {
    const query = Prisma.sql`SELECT
        i.nombre_actividad as nombreActividad,
        DATE_FORMAT(i.fecha_actividad, '%Y-%m-%d') as fechaActividad,
        i.cantidad,
        i.razon,
        i.dui,
        i.no_transaccion as noTransaccion,
        i.observaciones,
        ti.nombre as tipoIngreso,
        ta.nombre as tipoAportacion,
        tc.nombre as tipoControl
        FROM
        ingreso i
        INNER JOIN tipo_ingreso ti ON
        ti.id  = i.fk_tipo_ingreso
        INNER JOIN tipo_aportacion ta ON
        ta.id = i.fk_tipo_aportacion
        INNER JOIN tipo_control tc ON
        tc.id = i.fk_tipo_control;`;

    return this._prisma.$queryRaw<IReportIngreso[]>(query);
  }

  async reportGeneralIngresoEgreso(): Promise<IReportGeneralIngresoEgreso[]> {
    const query = Prisma.sql`SELECT
        tl.id,
        DATE_FORMAT(tl.fecha, '%Y-%m-%d') AS fecha,
        tl.monto_anterior AS montoAnterior,
        tl.monto_nuevo AS montoNuevo,
        tl.tipo,
        i.nombre_actividad AS actividadIngreso,
        e.nombre_actividad  AS actividadEgreso
      from
        total_log tl
      LEFT JOIN ingreso i ON
        i.id = tl.fk_ingreso
      LEFT JOIN egreso e ON
        e.id = tl.fk_egreso;`;

    return this._prisma.$queryRaw<IReportGeneralIngresoEgreso[]>(query);
  }
}
