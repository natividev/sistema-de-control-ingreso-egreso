import { Controller, Get, Query } from '@nestjs/common';
import { TimelineService } from './timeline.service';

@Controller('timeline')
export class TimelineController {
  constructor(private readonly timelineService: TimelineService) {}

  @Get('ingreso')
  getIngreso(@Query('id') id: number) {
    return this.timelineService.getIngreso(id);
  }

  @Get('egreso')
  getEgreso(@Query('id') id: number) {
    return this.timelineService.getEgreso(id);
  }
}
