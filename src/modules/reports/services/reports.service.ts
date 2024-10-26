import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '../repository/reports.repository';
import { currencyAdapter } from 'src/plugins';
import { CarboneService } from 'src/modules/carbone/carbone.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly _reportsRepository: ReportsRepository,
    private readonly _carboneService: CarboneService,
  ) {}

  async reportIngresoHistorico(): Promise<Buffer> {
    try {
      let total = 0;
      const ingreso = await this._reportsRepository.reportIngresoHistorico();

      const data = ingreso.map((ingreso) => {
        total += ingreso.cantidad;
        return {
          ...ingreso,
          cantidad: currencyAdapter.create(ingreso.cantidad).format(),
        };
      });

      const payload = {
        ingreso: data,
        total: currencyAdapter.create(total).format(),
      };

      const buffer = await this._carboneService.renderPDFCarbone(
        payload,
        'informe-ingresos-historico.odt',
        'pdf',
      );

      return buffer;
    } catch (error) {
      console.log(error);
      throw new Error('Error al generar reporte ingreso');
    }
  }

  async reportGeneralIngresoEgreso() {
    try {
      let totalIngreso = 0;
      let totalEgreso = 0;
      const ingreso =
        await this._reportsRepository.reportGeneralIngresoEgreso();

      const transformData = ingreso.map((ingreso) => {
        if (ingreso.tipo === 'INGRESO') {
          totalIngreso += ingreso.montoNuevo;
        }

        if (ingreso.tipo === 'EGRESO') {
          totalEgreso += ingreso.montoNuevo;
        }

        return {
          ...ingreso,
          montoNuevo: currencyAdapter.create(ingreso.montoNuevo).format(),
          montoAnterior: currencyAdapter.create(ingreso.montoAnterior).format(),
        };
      });

      const payload = {
        data: transformData,
        totalIngreso: currencyAdapter.create(totalIngreso).format(),
        totalEgreso: currencyAdapter.create(totalEgreso).format(),
      };

      return payload;
    } catch (error) {
      console.log(error);
      throw new Error('Error al generar reporte ingreso');
    }
  }
}
