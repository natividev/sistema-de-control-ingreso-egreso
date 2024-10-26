import { Module } from '@nestjs/common';
import { GeneralesService } from './generales.service';
import { GeneralesController } from './generales.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GeneralesController],
  providers: [GeneralesService, PrismaService],
})
export class GeneralesModule {}
