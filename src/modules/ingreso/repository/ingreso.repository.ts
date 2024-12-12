import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { PrismaService } from 'src/prisma.service';
import { ingreso, TipoLog } from '@prisma/client';
import pageBuilder from 'src/helpers/page-builder';

@Injectable()
export class IngresoRepository {
  constructor(private readonly _prisma: PrismaService) {}

  async crearIngreso({
    cantidad,
    fechaActividad,
    fkTipoAportacion,
    fkTipoControl,
    fkTipoIngreso,
    nombreActividad,
    noTransaccion,
    observaciones,
    idAfiliado,
  }: CreateIngresoDto) {
    const nuevoIngreso = await this._prisma.ingreso.create({
      data: {
        nombre_actividad: nombreActividad,
        fecha_actividad: fechaActividad,
        cantidad: cantidad,
        id_registro_afiliado: idAfiliado,
        no_transaccion: noTransaccion,
        observaciones: observaciones,
        fk_tipo_ingreso: fkTipoIngreso,
        fk_tipo_control: fkTipoControl,
        fk_tipo_aportacion: fkTipoAportacion,
      },
    });

    const totalIngreso = await this._prisma.total_ingreso.findFirst();

    const montoAnterior = totalIngreso?.monto || 0;
    const montoNuevo = montoAnterior + nuevoIngreso.cantidad;

    await this._prisma.total_ingreso.upsert({
      where: {
        id: totalIngreso ? totalIngreso.id : -1,
      },
      update: {
        monto: montoNuevo,
      },
      create: {
        monto: nuevoIngreso.cantidad,
      },
    });

    await this._prisma.total_log.create({
      data: {
        monto_ingreso: cantidad,
        fecha: new Date(),
        monto_anterior: montoAnterior,
        monto_nuevo: montoNuevo,
        tipo: TipoLog.INGRESO,
        fk_ingreso: nuevoIngreso.id,
      },
    });

    return nuevoIngreso;
  }

  async getIngreso() {
    return await pageBuilder<ingreso>(this._prisma.ingreso, {
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
        no_transaccion: true,
        observaciones: true,
        fk_tipo_ingreso: true,
        fk_tipo_control: true,
        fk_tipo_aportacion: true,
        active: true,
      },
    });
  }
}
