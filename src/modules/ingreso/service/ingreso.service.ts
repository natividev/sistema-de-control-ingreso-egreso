import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { IngresoRepository } from '../repository/ingreso.repository';
import { FilterQueryParams } from 'src/modules/proyecto/dto/filter-query-params';
import { UpdateIngresoDto } from '../dto/update-ingreso.dto';

@Injectable()
export class IngresoService {
  constructor(private readonly _ingresoRepository: IngresoRepository) {}

  async crearIngreso(ingreso: CreateIngresoDto) {
    try {
      await this._ingresoRepository.crearIngreso(ingreso);

      return {
        message: 'Ingreso creado correctamente',
      };
    } catch (error) {
      throw new Error('Error al crear ingreso');
    }
  }

  async updateIngreso(id: number, updateIngresoDto: UpdateIngresoDto) {
    try {
      return await this._ingresoRepository.updateIngreso(id, updateIngresoDto);
    } catch (error) {
      if (error instanceof UnprocessableEntityException) {
        throw error;
      }
      throw new Error(`Error al actualizar ingreso: ${error}`);
    }
  }

  async getIngreso(filterQueryParams: FilterQueryParams) {
    return await this._ingresoRepository.getIngreso(filterQueryParams);
  }
}
