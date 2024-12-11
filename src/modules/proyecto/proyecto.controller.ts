import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { FilterQueryParams } from './dto/filter-query-params';

@Controller('proyecto')
export class ProyectoController {
  constructor(private readonly proyectoService: ProyectoService) {}

  @Post()
  async create(@Body() createProyectoDto: CreateProyectoDto) {
    return await this.proyectoService.createProyecto(createProyectoDto);
  }

  @Get()
  async findAll(@Query() filterQueryParams: FilterQueryParams) {
    return await this.proyectoService.findAll(filterQueryParams);
  }

  @Get('nombre')
  async findAllList() {
    return await this.proyectoService.findAllList();
  }

  @Get('tipo-aportacion-proyecto')
  async findAllTipoAportacion() {
    return await this.proyectoService.findAllTipoAportacion();
  }
}
