import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { ProyectoRepository } from './proyecto.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProyectoController],
  providers: [ProyectoService, ProyectoRepository, PrismaService],
})
export class ProyectoModule {}
