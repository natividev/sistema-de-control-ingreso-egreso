import { Controller, Post, Body, Get, Query, Patch } from '@nestjs/common';
import { IngresoService } from '../service/ingreso.service';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { FilterQueryParams } from 'src/modules/proyecto/dto/filter-query-params';
import { UpdateIngresoDto } from '../dto/update-ingreso.dto';

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly _ingresoService: IngresoService) {}

  @Post()
  crearIngreso(@Body() createIngresoDto: CreateIngresoDto) {
    return this._ingresoService.crearIngreso(createIngresoDto);
  }

  @Patch()
  update(@Query('id') id: number, @Body() updateIngresoDto: UpdateIngresoDto) {
    return this._ingresoService.updateIngreso(id, updateIngresoDto);
  }

  @Get()
  getIngreso(@Query() filterQueryParams: FilterQueryParams) {
    return this._ingresoService.getIngreso(filterQueryParams);
  }
}
