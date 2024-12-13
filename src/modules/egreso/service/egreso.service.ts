import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { EgresoRepository } from '../repository/egreso.repository';
import { UpdateEgresoDto } from '../dto/update-egreso.dto';

@Injectable()
export class EgresoService {
  constructor(private readonly _egresoRepository: EgresoRepository) {}

  async create(createEgresoDto: CreateEgresoDto) {
    try {
      return await this._egresoRepository.createEgreso(createEgresoDto);
    } catch (error) {
      console.log(error);
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new Error(`Error al crear egreso: ${error}`);
    }
  }

  async updateEgreso(id: number, updateEgresoDto: UpdateEgresoDto) {
    try {
      return await this._egresoRepository.updateEgreso(id, updateEgresoDto);
    } catch (error) {
      console.log(error);
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new Error(`Error al actualizar egreso: ${error}`);
    }
  }

  async getEgreso() {
    return await this._egresoRepository.getEgreso();
  }
}
