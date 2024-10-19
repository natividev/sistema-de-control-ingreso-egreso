import { Controller, Post, Body } from '@nestjs/common';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { EgresoService } from '../service/egreso.service';

@Controller('egreso')
export class EgresoController {
  constructor(private readonly egresoService: EgresoService) {}

  @Post()
  create(@Body() createEgresoDto: CreateEgresoDto) {
    return this.egresoService.create(createEgresoDto);
  }
}
