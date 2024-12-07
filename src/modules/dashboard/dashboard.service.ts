import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './dashboard.repository';

@Injectable()
export class DashboardService {
  constructor(private readonly dashboardRepository: DashboardRepository) {}

  async ingresoEgreso() {
    return this.dashboardRepository.ingresoEgreso();
  }

  async ingresoGraficaLinea() {
    return this.dashboardRepository.ingresoGraficaLinea();
  }
}
