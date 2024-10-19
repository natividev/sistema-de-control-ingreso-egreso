import { Injectable } from '@nestjs/common';
import { CreateEgresoDto } from '../dto/create-egreso.dto';
import { EgresoRepository } from '../repository/egreso.repository';

@Injectable()
export class EgresoService {
  constructor(private readonly _egresoRepository: EgresoRepository) {}

  async create(createEgresoDto: CreateEgresoDto) {
    try {
      return await this._egresoRepository.createEgreso(createEgresoDto);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear egreso');
    }
  }
}
