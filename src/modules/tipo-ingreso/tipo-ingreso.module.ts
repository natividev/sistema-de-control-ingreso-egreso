import { Module } from '@nestjs/common';
import { TipoIngresoService } from './tipo-ingreso.service';
import { TipoIngresoController } from './tipo-ingreso.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TipoIngresoController],
  providers: [TipoIngresoService, PrismaService],
})
export class TipoIngresoModule {}
