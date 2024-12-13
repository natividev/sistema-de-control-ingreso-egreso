import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { egreso, TipoLog } from '@prisma/client';
import pageBuilder from 'src/helpers/page-builder';
import { UpdateEgresoDto } from '../dto/update-egreso.dto';

@Injectable()
export class EgresoRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async createEgreso({
    cantidad,
    fechaActividad,
    fkTipoAportacion,
    fkTipoControl,
    nombreActividad,
    noTransaccion,
    observaciones,
    idAfiliado,
    fkTipoAfiliado,
  }: CreateEgresoDto) {
    await this._prisma.$transaction(async (tx) => {
      const nuevoEgreso = await tx.egreso.create({
        data: {
          nombre_actividad: nombreActividad,
          fecha_actividad: fechaActividad,
          cantidad,
          id_registro_afiliado: idAfiliado,
          no_transaccion: noTransaccion,
          fk_tipo_afiliado: fkTipoAfiliado,
          observaciones,
          fk_tipo_aportacion: fkTipoAportacion,
          fk_tipo_control: fkTipoControl,
        },
      });

      const totalEgreso = await tx.total_egreso.findFirst();
      const totalIngreso = await tx.total_ingreso.findFirst();

      if (cantidad >= totalIngreso.monto) {
        throw new UnprocessableEntityException(
          'El ingreso no puede ser mayor a la cantidad ingresada',
        );
      }

      const montoAnteriorEgreso = totalEgreso?.monto || 0;
      const montoNuevoEgreso = montoAnteriorEgreso + nuevoEgreso.cantidad;

      await tx.total_egreso.upsert({
        where: { id: totalEgreso ? totalEgreso.id : -1 },
        update: { monto: montoNuevoEgreso },
        create: { monto: nuevoEgreso.cantidad },
      });

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

  async updateEgreso(id: number, updateEgresoDto: UpdateEgresoDto) {
    await this._prisma.egreso.update({
      where: {
        id: id,
      },
      data: {
        nombre_actividad: updateEgresoDto.nombreActividad,
        fecha_actividad: updateEgresoDto.fechaActividad,
        id_registro_afiliado: updateEgresoDto.idAfiliado,
        no_transaccion: updateEgresoDto.noTransaccion,
        observaciones: updateEgresoDto.observaciones,
        fk_tipo_afiliado: updateEgresoDto.fkTipoAfiliado,
        fk_tipo_aportacion: updateEgresoDto.fkTipoAportacion,
        fk_tipo_control: updateEgresoDto.fkTipoControl,
      },
    });

    return {
      message: 'Egreso actualizado correctamente',
    };
  }

  async getEgreso() {
    return await pageBuilder<egreso>(this._prisma.egreso, {
      limit: 10,
      page: 1,
      where: {
        active: true,
      },
      select: {
        id: true,
        nombre_actividad: true,
        fecha_actividad: true,
        cantidad: true,
        id_registro_afiliado: true,
        fk_tipo_afiliado: true,
        no_transaccion: true,
        observaciones: true,
        fk_tipo_aportacion: true,
        fk_tipo_control: true,
        anulado: true,
        active: true,
      },
    });
  }
}
