import { Module } from '@nestjs/common';
import { AnulacionService } from './anulacion.service';
import { AnulacionController } from './anulacion.controller';
import { AnulacionRepository } from './anulacion.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AnulacionController],
  providers: [AnulacionService, AnulacionRepository, PrismaService],
})
export class AnulacionModule {}
