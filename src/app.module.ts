import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { TipoIngresoModule } from './modules/tipo-ingreso/tipo-ingreso.module';
import { TipoControlModule } from './modules/tipo-control/tipo-control.module';
import { TipoAportacionModule } from './modules/tipo-aportacion/tipo-aportacion.module';
import { EgresoModule } from './modules/egreso/egreso.module';
import { ReportsModule } from './modules/reports/reports.module';
import { GeneralesModule } from './modules/generales/generales.module';
import { AfiliadosModule } from './modules/afiliados/afiliados.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';

@Module({
  imports: [
    IngresoModule,
    TipoIngresoModule,
    TipoControlModule,
    TipoAportacionModule,
    EgresoModule,
    ReportsModule,
    GeneralesModule,
    AfiliadosModule,
    DashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
