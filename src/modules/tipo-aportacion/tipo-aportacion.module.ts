import { Module } from '@nestjs/common';
import { TipoAportacionService } from './tipo-aportacion.service';
import { TipoAportacionController } from './tipo-aportacion.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TipoAportacionController],
  providers: [TipoAportacionService, PrismaService],
})
export class TipoAportacionModule {}
