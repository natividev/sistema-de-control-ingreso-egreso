import { Module } from '@nestjs/common';
import { CategoriaProyectoService } from './categoria-proyecto.service';
import { CategoriaProyectoController } from './categoria-proyecto.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [CategoriaProyectoController],
  providers: [CategoriaProyectoService, PrismaService],
})
export class CategoriaProyectoModule {}
