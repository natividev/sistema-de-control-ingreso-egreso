import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { TipoLog } from '@prisma/client';

@Injectable()
export class EgresoRepository {
  constructor(private readonly _prisma: PrismaService) {}

  createEgreso({
    cantidad,
    fechaActividad,
    fkTipoAportacion,
    fkTipoControl,
    nombreActividad,
    dui,
    noTransaccion,
    observaciones,
    razon,
  }: CreateEgresoDto) {
    const nuevoEgreso = this._prisma.$transaction(async (tx) => {
      const nuevoEgreso = await tx.egreso.create({
        data: {
          nombre_actividad: nombreActividad,
          fecha_actividad: fechaActividad,
          cantidad: cantidad,
          razon: razon,
          dui: dui,
          no_transaccion: noTransaccion,
          observaciones: observaciones,
          fk_tipo_aportacion: fkTipoAportacion,
          fk_tipo_control: fkTipoControl,
        },
      });
      const totalEgreso = await tx.total_egreso.findFirst();
      const montoAnterior = totalEgreso?.monto || 0;
      const montoNuevo = montoAnterior - nuevoEgreso.cantidad;

      const totalIngreso = await tx.total_ingreso.findFirst();
      const montoAnteriorIngreso = totalIngreso?.monto || 0;
      const montoNuevoIngreso = montoAnteriorIngreso - nuevoEgreso.cantidad;

      await tx.total_egreso.upsert({
        where: {
          id: totalEgreso ? totalEgreso.id : -1,
        },
        update: {
          monto: montoNuevo,
        },
        create: {
          monto: nuevoEgreso.cantidad,
        },
      });

      await tx.total_ingreso.upsert({
        where: {
          id: totalIngreso ? totalIngreso.id : -1,
        },
        update: {
          monto: montoNuevoIngreso,
        },
        create: {
          monto: nuevoEgreso.cantidad,
        },
      });

      await tx.total_log.create({
        data: {
          fecha: new Date(),
          monto_anterior: montoAnterior,
          monto_nuevo: montoNuevo,
          tipo: TipoLog.EGRESO,
          fk_egreso: nuevoEgreso.id,
        },
      });

      return nuevoEgreso;
    });

    return nuevoEgreso;
  }
}
