import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { TipoLog } from '@prisma/client';

@Injectable()
export class EgresoRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async createEgreso({
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
    await this._prisma.$transaction(async (tx) => {
      const nuevoEgreso = await tx.egreso.create({
        data: {
          nombre_actividad: nombreActividad,
          fecha_actividad: fechaActividad,
          cantidad,
          razon,
          dui,
          no_transaccion: noTransaccion,
          observaciones,
          fk_tipo_aportacion: fkTipoAportacion,
          fk_tipo_control: fkTipoControl,
        },
      });

      const totalEgreso = await tx.total_egreso.findFirst();
      const montoAnteriorEgreso = totalEgreso?.monto || 0;
      const montoNuevoEgreso = montoAnteriorEgreso + nuevoEgreso.cantidad;

      await tx.total_egreso.upsert({
        where: { id: totalEgreso ? totalEgreso.id : -1 },
        update: { monto: montoNuevoEgreso },
        create: { monto: nuevoEgreso.cantidad },
      });

      const totalIngreso = await tx.total_ingreso.findFirst();

      const montoNuevoIngreso = totalIngreso.monto - cantidad;

      await tx.total_ingreso.update({
        where: {
          id: 1,
        },
        data: {
          monto: montoNuevoIngreso,
        },
      });

      await tx.total_log.create({
        data: {
          fecha: new Date(),
          monto_ingreso: -cantidad,
          monto_anterior: montoAnteriorEgreso,
          monto_nuevo: montoNuevoEgreso,
          tipo: TipoLog.EGRESO,
          fk_egreso: nuevoEgreso.id,
        },
      });

      return nuevoEgreso;
    });

    return {
      message: 'Egreso creado correctamente',
    };
  }
}
