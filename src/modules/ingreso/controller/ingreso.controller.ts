import { Controller, Post, Body, Get } from '@nestjs/common';
import { IngresoService } from '../service/ingreso.service';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly _ingresoService: IngresoService) {}

  @Post()
  crearIngreso(@Body() createIngresoDto: CreateIngresoDto) {
    return this._ingresoService.crearIngreso(createIngresoDto);
  }

  @Get()
  getIngreso() {
    return this._ingresoService.getIngreso();
  }
}
