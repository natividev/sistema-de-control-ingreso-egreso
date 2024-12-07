import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get('ingreso-egreso')
  async ingresoEgreso() {
    return await this.dashboardService.ingresoEgreso();
  }
}
