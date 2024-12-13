import { Controller, Post, Body, Get, Patch, Query } from '@nestjs/common';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { EgresoService } from '../service/egreso.service';
import { UpdateEgresoDto } from '../dto/update-egreso.dto';

@Controller('egreso')
export class EgresoController {
  constructor(private readonly egresoService: EgresoService) {}

  @Post()
  create(@Body() createEgresoDto: CreateEgresoDto) {
    return this.egresoService.create(createEgresoDto);
  }

  @Patch()
  update(@Query('id') id: number, @Body() updateEgresoDto: UpdateEgresoDto) {
    return this.egresoService.updateEgreso(id, updateEgresoDto);
  }

  @Get()
  getEgreso() {
    return this.egresoService.getEgreso();
  }
}
