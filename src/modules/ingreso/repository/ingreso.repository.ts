import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { PrismaService } from 'src/prisma.service';

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
    dui,
    noTransaccion,
    observaciones,
    razon,
  }: CreateIngresoDto) {
    const nuevoIngreso = await this._prisma.ingreso.create({
      data: {
        nombre_actividad: nombreActividad,
        fecha_actividad: fechaActividad,
        cantidad: cantidad,
        razon: razon,
        dui: dui,
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
        fecha: new Date(),
        monto_anterior: montoAnterior,
        monto_nuevo: montoNuevo,
        tipo: 'INGRESO',
        fk_ingreso: nuevoIngreso.id,
      },
    });

    return nuevoIngreso;
  }
}
