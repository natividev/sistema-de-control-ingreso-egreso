import { Module } from '@nestjs/common';
import { AfiliadosService } from './afiliados.service';
import { AfiliadosController } from './afiliados.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [AfiliadosController],
  providers: [AfiliadosService, PrismaService],
})
export class AfiliadosModule {}
