import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngresoModule } from './modules/ingreso/ingreso.module';
import { TipoIngresoModule } from './modules/tipo-ingreso/tipo-ingreso.module';
import { TipoControlModule } from './modules/tipo-control/tipo-control.module';

@Module({
  imports: [IngresoModule, TipoIngresoModule, TipoControlModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
