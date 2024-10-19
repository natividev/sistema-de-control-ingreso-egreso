import { Controller, Get, Res } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { Response } from 'express';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('ingreso')
  async reportIngreso(@Res() res: Response) {
    const pdfBuffer = await this.reportsService.reportIngresoHistorico();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=informe-ingresos-historico.pdf',
    );
    res.send(pdfBuffer);
    res.end();
    return pdfBuffer;
  }
}
