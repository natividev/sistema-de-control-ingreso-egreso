import { Module } from '@nestjs/common';
import { ReportsController } from './controller/reports.controller';
import { ReportsRepository } from './repository/reports.repository';
import { PrismaService } from 'src/prisma.service';
import { ReportsService } from './services/reports.service';
import { CarboneService } from '../carbone/carbone.service';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService, ReportsRepository, PrismaService, CarboneService],
})
export class ReportsModule {}
