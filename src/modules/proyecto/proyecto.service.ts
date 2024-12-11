import { Injectable } from '@nestjs/common';
import { ProyectoRepository } from './proyecto.repository';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { ProyectoMapper } from './mapper';
import { FilterQueryParams } from './dto/filter-query-params';

@Injectable()
export class ProyectoService {
  constructor(private readonly proyectoRepository: ProyectoRepository) {}

  async createProyecto(createProyectoDto: CreateProyectoDto) {
    return await this.proyectoRepository.createProyecto(
      ProyectoMapper.toDto(createProyectoDto),
    );
  }

  async findAll(filterQueryParams: FilterQueryParams) {
    return await this.proyectoRepository.findAll(filterQueryParams);
  }

  async findAllList() {
    return await this.proyectoRepository.findAllList();
  }

  async findAllTipoAportacion() {
    return await this.proyectoRepository.findAllTipoAportacion();
  }
}
