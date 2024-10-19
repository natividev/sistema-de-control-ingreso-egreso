import { Module } from '@nestjs/common';
import { CarboneService } from './carbone.service';

@Module({
  providers: [CarboneService],
})
export class CarboneModule {}
