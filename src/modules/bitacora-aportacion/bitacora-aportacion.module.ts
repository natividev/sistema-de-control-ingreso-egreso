import { Module } from '@nestjs/common';
import { BitacoraAportacionService } from './bitacora-aportacion.service';
import { BitacoraAportacionController } from './bitacora-aportacion.controller';
import { BitacoraAportacionRepository } from './bitacora-aportacion.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [BitacoraAportacionController],
  providers: [
    BitacoraAportacionService,
    BitacoraAportacionRepository,
    PrismaService,
  ],
})
export class BitacoraAportacionModule {}
