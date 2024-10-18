import { Module } from '@nestjs/common';
import { TipoControlService } from './tipo-control.service';
import { TipoControlController } from './tipo-control.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TipoControlController],
  providers: [TipoControlService, PrismaService],
})
export class TipoControlModule {}
