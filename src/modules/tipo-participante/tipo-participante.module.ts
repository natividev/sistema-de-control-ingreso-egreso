import { Module } from '@nestjs/common';
import { TipoParticipanteService } from './tipo-participante.service';
import { TipoParticipanteController } from './tipo-participante.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TipoParticipanteController],
  providers: [TipoParticipanteService, PrismaService],
})
export class TipoParticipanteModule {}
