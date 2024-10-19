import { Module } from '@nestjs/common';
import { EgresoRepository } from './repository/egreso.repository';
import { PrismaService } from 'src/prisma.service';
import { EgresoController } from './controller/egreso.controller';
import { EgresoService } from './service/egreso.service';

@Module({
  controllers: [EgresoController],
  providers: [EgresoService, EgresoRepository, PrismaService],
})
export class EgresoModule {}
