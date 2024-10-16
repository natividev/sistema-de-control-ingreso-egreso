import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IngresoModule } from './modules/ingreso/ingreso.module';

@Module({
  imports: [IngresoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
