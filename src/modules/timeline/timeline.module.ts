import { Module } from '@nestjs/common';
import { TimelineService } from './timeline.service';
import { TimelineController } from './timeline.controller';
import { PrismaService } from 'src/prisma.service';
import { TimelineRepository } from './timeline.repository';

@Module({
  controllers: [TimelineController],
  providers: [TimelineService, TimelineRepository, PrismaService],
})
export class TimelineModule {}
