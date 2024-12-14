import { Injectable } from '@nestjs/common';
import { TimelineRepository } from './timeline.repository';
import { currencyAdapter } from 'src/plugins';

@Injectable()
export class TimelineService {
  constructor(private readonly timelineRepository: TimelineRepository) {}

  async getIngreso(id: number) {
    const ingresoTimeLinea = await this.timelineRepository.getIngreso(id);

    if (!ingresoTimeLinea.length) {
      return {
        message: 'No se encontro registro de movimientos de ingreso',
      };
    }

    const montoTotalAnulacion = ingresoTimeLinea.reduce(
      (acum, ingreso) => acum + ingreso.montoAnulacion,
      0,
    );

    const ingresoTimeLineaFormat = ingresoTimeLinea.map((ingreso) => {
      return {
        ...ingreso,
        montoOriginalSinAlterar: currencyAdapter
          .create(ingreso.montoOriginalSinAlterar)
          .format(),
        montoAnulacion: currencyAdapter.create(ingreso.montoAnulacion).format(),
        montoOriginal: currencyAdapter.create(ingreso.montoOriginal).format(),
      };
    });

    const payload = {
      ingreso: ingresoTimeLineaFormat,
      montoTotalSinAlteracion: currencyAdapter
        .create(ingresoTimeLinea[0]?.montoOriginalSinAlterar)
        .format(),
      montoTotalAnulacion: currencyAdapter.create(montoTotalAnulacion).format(),
      total: currencyAdapter
        .create(ingresoTimeLinea[0]?.montoOriginalSinAlterar)
        .subtract(montoTotalAnulacion)
        .format(),
    };

    return payload;
  }

  async getEgreso(id: number) {
    const egresoTimeLinea = await this.timelineRepository.getEgreso(id);

    if (!egresoTimeLinea.length) {
      return {
        message: 'No se encontro registro de movimientos de egreso',
      };
    }

    const montoTotalAnulacion = egresoTimeLinea.reduce(
      (acum, egreso) => acum + egreso.montoAnulacion,
      0,
    );

    const egresoTimeLineaFormat = egresoTimeLinea.map((egreso) => {
      return {
        ...egreso,
        montoOriginalSinAlterar: currencyAdapter
          .create(egreso.montoOriginalSinAlterar)
          .format(),
        montoAnulacion: currencyAdapter.create(egreso.montoAnulacion).format(),
        montoOriginal: currencyAdapter.create(egreso.montoOriginal).format(),
      };
    });

    const payload = {
      egreso: egresoTimeLineaFormat,
      montoTotalSinAlteracion: currencyAdapter
        .create(egresoTimeLinea[0]?.montoOriginalSinAlterar)
        .format(),
      montoTotalAnulacion: currencyAdapter.create(montoTotalAnulacion).format(),
      total: currencyAdapter
        .create(egresoTimeLinea[0]?.montoOriginalSinAlterar)
        .subtract(montoTotalAnulacion)
        .format(),
    };

    return payload;
  }
}
