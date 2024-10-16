import { Module } from '@nestjs/common';
import { IngresoController } from './controller/ingreso.controller';
import { IngresoService } from './service/ingreso.service';
import { IngresoRepository } from './repository/ingreso.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [IngresoController],
  providers: [IngresoService, IngresoRepository, PrismaService],
})
export class IngresoModule {}
