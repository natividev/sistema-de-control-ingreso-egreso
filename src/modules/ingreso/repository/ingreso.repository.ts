import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { PrismaService } from 'src/prisma.service';
import { ingreso, TipoLog } from '@prisma/client';
import pageBuilder from 'src/helpers/page-builder';
import { FilterQueryParams } from 'src/modules/proyecto/dto/filter-query-params';
import { UpdateIngresoDto } from '../dto/update-ingreso.dto';

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
    fkTipoAfiliado,
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
        fk_tipo_afiliado: fkTipoAfiliado,
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

  async getIngreso({ limit, page }: FilterQueryParams) {
    return await pageBuilder<ingreso>(this._prisma.ingreso, {
      limit,
      page,
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
        anulado: true,
        fk_tipo_ingreso: true,
        fk_tipo_control: true,
        fk_tipo_aportacion: true,
        fk_tipo_afiliado: true,
        active: true,
      },
    });
  }

  async updateIngreso(id: number, updateIngresoDto: UpdateIngresoDto) {
    await this._prisma.ingreso.update({
      where: {
        id: id,
      },
      data: {
        nombre_actividad: updateIngresoDto.nombreActividad,
        fecha_actividad: updateIngresoDto.fechaActividad,
        id_registro_afiliado: updateIngresoDto.idAfiliado,
        no_transaccion: updateIngresoDto.noTransaccion,
        observaciones: updateIngresoDto.observaciones,
        fk_tipo_ingreso: updateIngresoDto.fkTipoIngreso,
        fk_tipo_control: updateIngresoDto.fkTipoControl,
        fk_tipo_aportacion: updateIngresoDto.fkTipoAportacion,
      },
    });

    return {
      message: 'Ingreso actualizado correctamente',
    };
  }
}
