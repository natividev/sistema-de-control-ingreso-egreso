import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import {
  IReporteEgreso,
  IReportGeneralIngresoEgreso,
  IReportIngreso,
} from '../interfaces';
import { ParamsDto } from '../dto/params.dto';

@Injectable()
export class ReportsRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async reportIngresoHistorico({
    desde,
    hasta,
  }: ParamsDto): Promise<IReportIngreso[]> {
    let whereConditions = Prisma.sql``;

    if (desde && hasta) {
      whereConditions = Prisma.sql`
        WHERE i.fecha_actividad BETWEEN ${desde} AND ${hasta}
      `;
    }

    const query = Prisma.sql`
      SELECT
        i.nombre_actividad AS nombreActividad,
        DATE_FORMAT(i.fecha_actividad, '%Y-%m-%d') AS fechaActividad,
        i.cantidad,
        ra.razon_social as razon,
        ra.numero_documento as dui,
        i.no_transaccion AS noTransaccion,
        i.observaciones,
        ti.nombre AS tipoIngreso,
        ta.nombre AS tipoAportacion,
        tc.nombre AS tipoControl
      FROM
        ingreso i
      INNER JOIN tipo_ingreso ti ON ti.id = i.fk_tipo_ingreso
      INNER JOIN tipo_aportacion ta ON ta.id = i.fk_tipo_aportacion
      INNER JOIN tipo_control tc ON tc.id = i.fk_tipo_control
      INNER JOIN registro_afiliado ra ON ra.id = i.id_registro_afiliado
      ${whereConditions};
    `;

    return await this._prisma.$queryRaw<IReportIngreso[]>(query);
  }

  async reportEgresoHistorico({
    desde,
    hasta,
  }: ParamsDto): Promise<IReporteEgreso[]> {
    let whereConditions = Prisma.sql``;

    if (desde && hasta) {
      whereConditions = Prisma.sql`
        WHERE e.fecha_actividad BETWEEN ${desde} AND ${hasta}
      `;
    }

    const query = Prisma.sql`SELECT
        e.nombre_actividad as nombreActividad,
        DATE_FORMAT(e.fecha_actividad, '%Y-%m-%d') as fechaActividad,
        e.cantidad,
        ra.razon_social as razon,
        ra.numero_documento as dui,
        e.no_transaccion as noTransaccion,
        e.observaciones,
        ta.nombre as tipoAportacion,
        tc.nombre as tipoControl
      FROM
        egreso e
      INNER JOIN tipo_aportacion ta ON
        ta.id = e.fk_tipo_aportacion
      INNER JOIN tipo_control tc ON
        tc.id = e.fk_tipo_control
      INNER JOIN registro_afiliado
        ra ON ra.id = e.id_registro_afiliado
      ${whereConditions};`;

    return await this._prisma.$queryRaw<IReportIngreso[]>(query);
  }

  async reportGeneralIngresoEgreso({
    desde,
    hasta,
  }: ParamsDto): Promise<IReportGeneralIngresoEgreso[]> {
    let whereConditions = Prisma.sql``;

    const from = `${desde} 00:00:00`;
    const to = `${hasta} 23:59:59`;

    if (desde && hasta) {
      whereConditions = Prisma.sql`
        WHERE tl.fecha BETWEEN ${from} AND ${to}
      `;
    }

    const query = Prisma.sql`SELECT
        tl.id,
        DATE_FORMAT(tl.fecha, '%Y-%m-%d') AS fecha,
        tl.monto_anterior AS montoAnterior,
        tl.monto_nuevo AS montoNuevo,
        tl.monto_ingreso AS montoIngreso,
        tl.tipo,
        i.nombre_actividad AS actividadIngreso,
        e.nombre_actividad  AS actividadEgreso
      from
        total_log tl
      LEFT JOIN ingreso i ON
        i.id = tl.fk_ingreso
      LEFT JOIN egreso e ON
        e.id = tl.fk_egreso
      ${whereConditions};`;

    return await this._prisma.$queryRaw<IReportGeneralIngresoEgreso[]>(query);
  }
}
