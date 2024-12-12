import { Injectable } from '@nestjs/common';
import { CreateBitacoraAportacionDto } from './dto/create-bitacora-aportacion.dto';
import { BitacoraAportacionRepository } from './bitacora-aportacion.repository';
import { ProyectoBitacoraMapper } from './mapper';
import { UpdateBitacoraAportacionDto } from './dto/update-bitacora-aportacion.dto';
import { FilterQueryParams } from '../proyecto/dto/filter-query-params';

@Injectable()
export class BitacoraAportacionService {
  constructor(
    private readonly bitacoraAportacionRepository: BitacoraAportacionRepository,
  ) {}

  async createBitacora(
    createBitacoraAportacionDto: CreateBitacoraAportacionDto,
  ) {
    return await this.bitacoraAportacionRepository.createBitacora(
      ProyectoBitacoraMapper.toDto(createBitacoraAportacionDto),
    );
  }

  async updateBitacora(
    updateBitacoraAportacionDto: UpdateBitacoraAportacionDto,
    id: number,
  ) {
    return await this.bitacoraAportacionRepository.updateBitacora(
      ProyectoBitacoraMapper.toDto(updateBitacoraAportacionDto),
      id,
    );
  }

  async findAllBitacora(filterQueryParams: FilterQueryParams) {
    return await this.bitacoraAportacionRepository.findAllBitacora(
      filterQueryParams,
    );
  }
}
