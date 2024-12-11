import { Controller, Get, Query, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { Response } from 'express';
import { ParamsDto } from '../dto/params.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('ingreso')
  async reportIngreso(@Res() res: Response, @Query() params: ParamsDto) {
    const pdfBuffer = await this.reportsService.reportIngresoHistorico(params);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=informe-ingresos-historico.pdf',
    );
    res.send(pdfBuffer);
    res.end();
    return pdfBuffer;
  }

  @Get('egreso')
  async reportEgreso(@Res() res: Response, @Query() params: ParamsDto) {
    const pdfBuffer = await this.reportsService.reportEgresoHistorico(params);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=informe-egresos-historico.pdf',
    );
    res.send(pdfBuffer);
    res.end();
    return pdfBuffer;
  }

  @Get('ingreso-egreso')
  async reportIngresoEgreso(@Res() res: Response, @Query() params: ParamsDto) {
    const pdfBuffer =
      await this.reportsService.reportGeneralIngresoEgreso(params);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=informe-ingresos-egresos.pdf',
    );
    res.send(pdfBuffer);
    res.end();
    return pdfBuffer;
  }

  @Get('resumen-aportaciones-por-proyecto')
  async resumenDeAportacionesPorProyecto(@Res() res: Response) {
    const pdfBuffer =
      await this.reportsService.resumenDeAportacionesPorProyecto();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=resumen-aportaciones-por-proyecto.pdf',
    );

    res.send(pdfBuffer);
    res.end();
    return pdfBuffer;
  }
}
