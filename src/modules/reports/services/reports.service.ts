import { Injectable } from '@nestjs/common';
import { ReportsRepository } from '../repository/reports.repository';
import { currencyAdapter } from 'src/plugins';
import { CarboneService } from 'src/modules/carbone/carbone.service';
import { ParamsDto } from '../dto/params.dto';
import * as moment from 'moment';
import { insertImageToDocument } from 'src/utils/Image-colocar-documentos.document';

@Injectable()
export class ReportsService {
  constructor(
    private readonly _reportsRepository: ReportsRepository,
    private readonly _carboneService: CarboneService,
  ) {}

  async reportIngresoHistorico(params: ParamsDto): Promise<Buffer> {
    try {
      let total = 0;
      const ingreso =
        await this._reportsRepository.reportIngresoHistorico(params);

      const data = ingreso.map((ingreso) => {
        total += ingreso.cantidad;
        return {
          ...ingreso,
          cantidad: currencyAdapter.create(ingreso.cantidad).format(),
          nombreActividad: ingreso.anulado
            ? `ANULADO - ${ingreso.nombreActividad}`
            : ingreso.nombreActividad,
        };
      });

      const payload = {
        ingreso: data,
        total: currencyAdapter.create(total).format(),
        fechaImpresion: moment().format('DD/MM/YYYY HH:mm:ss'),
      };

      const buffer = await this._carboneService.renderPDFCarbone(
        payload,
        'informe-ingresos-historico.odt',
        'pdf',
      );

      const bufferPDFConImage = await insertImageToDocument(buffer);

      const resultBuffer = bufferPDFConImage;

      return resultBuffer;
    } catch (error) {
      throw new Error('Error al generar reporte ingreso');
    }
  }

  async reportEgresoHistorico(params: ParamsDto): Promise<Buffer> {
    try {
      let total = 0;
      const ingreso =
        await this._reportsRepository.reportEgresoHistorico(params);

      const data = ingreso.map((ingreso) => {
        total += ingreso.cantidad;
        return {
          ...ingreso,
          cantidad: currencyAdapter.create(ingreso.cantidad).format(),
          nombreActividad: ingreso.anulado
            ? `ANULADO - ${ingreso.nombreActividad}`
            : ingreso.nombreActividad,
        };
      });

      const payload = {
        ingreso: data,
        total: currencyAdapter.create(total).format(),
        fechaImpresion: moment().format('DD/MM/YYYY HH:mm:ss'),
      };

      const buffer = await this._carboneService.renderPDFCarbone(
        payload,
        'informe-egresos-historico.odt',
        'pdf',
      );

      const bufferPDFConImage = await insertImageToDocument(buffer);

      const resultBuffer = bufferPDFConImage;

      return resultBuffer;
    } catch (error) {
      throw new Error('Error al generar reporte ingreso');
    }
  }

  async reportGeneralIngresoEgreso(params: ParamsDto): Promise<Buffer> {
    try {
      let totalIngreso = 0;
      let totalEgreso = 0;
      let totalGeneral = 0;
      const ingreso =
        await this._reportsRepository.reportGeneralIngresoEgreso(params);

      const transformData = ingreso.map((ingreso) => {
        if (ingreso.tipo === 'INGRESO') {
          totalIngreso += ingreso.montoIngreso;
        }

        if (ingreso.tipo === 'EGRESO') {
          totalEgreso += ingreso.montoIngreso;
        }

        totalGeneral = totalIngreso - Math.abs(totalEgreso);

        return {
          ...ingreso,
          montoNuevo: currencyAdapter.create(ingreso.montoNuevo).format(),
          montoAnterior: currencyAdapter.create(ingreso.montoAnterior).format(),
          montoIngreso: currencyAdapter.create(ingreso.montoIngreso).format(),
        };
      });

      const payload = {
        data: transformData,
        totalIngreso: currencyAdapter.create(totalIngreso).format(),
        totalEgreso: currencyAdapter.create(totalEgreso).format(),
        totalGeneral: currencyAdapter.create(totalGeneral).format(),
        fechaImpresion: moment().format('DD/MM/YYYY HH:mm:ss'),
      };

      const buffer = await this._carboneService.renderPDFCarbone(
        payload,
        'informe-general-ingresos-egresos.odt',
        'pdf',
      );

      const bufferPDFConImage = await insertImageToDocument(buffer);

      const resultBuffer = bufferPDFConImage;

      return resultBuffer;
    } catch (error) {
      throw new Error('Error al generar reporte ingreso');
    }
  }

  async resumenDeAportacionesPorProyecto(params: ParamsDto): Promise<Buffer> {
    try {
      const resumenData =
        await this._reportsRepository.resumenDeAportacionesPorProyecto(params);

      console.log(JSON.stringify(resumenData, null, 2));

      const proyecto = resumenData.map((resumen) => {
        return {
          proyecto: [
            {
              ...resumen,
              aportadores: undefined,
              observacion: resumen.observacion,
            },
          ],
          aportadores: resumen.aportadores,
          tipoParticipante: Array.isArray(resumen.tipoParticipante)
            ? resumen.tipoParticipante.join(', ')
            : JSON.parse(resumen.tipoParticipante).join(', '),
        };
      });

      const payload = {
        aportador: proyecto,
        fechaImpresion: moment().format('DD/MM/YYYY HH:mm:ss'),
      };

      const buffer = await this._carboneService.renderPDFCarbone(
        payload,
        'resumen-aportaciones-por-proyecto.odt',
        'pdf',
      );

      const bufferPDFConImage = await insertImageToDocument(buffer);

      const resultBuffer = bufferPDFConImage;

      return resultBuffer;
    } catch (error) {
      throw new Error('Error al generar reporte ingreso');
    }
  }
}
