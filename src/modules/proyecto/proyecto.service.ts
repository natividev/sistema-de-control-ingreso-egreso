import { Injectable } from '@nestjs/common';
import { ProyectoRepository } from './proyecto.repository';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { ProyectoMapper } from './mapper';
import { FilterQueryParams } from './dto/filter-query-params';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';

@Injectable()
export class ProyectoService {
  constructor(private readonly proyectoRepository: ProyectoRepository) {}

  async createProyecto(createProyectoDto: CreateProyectoDto) {
    return await this.proyectoRepository.createProyecto(
      ProyectoMapper.toDto(createProyectoDto),
    );
  }

  async updateProyecto(updateProyectoDto: UpdateProyectoDto, id: number) {
    return await this.proyectoRepository.updateProyecto(
      ProyectoMapper.toDto(updateProyectoDto),
      id,
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
