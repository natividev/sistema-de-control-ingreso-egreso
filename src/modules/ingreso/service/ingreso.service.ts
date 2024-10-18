import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { IngresoRepository } from '../repository/ingreso.repository';

@Injectable()
export class IngresoService {
  constructor(private readonly _ingresoRepository: IngresoRepository) {}

  async crearIngreso(ingreso: CreateIngresoDto) {
    try {
      return await this._ingresoRepository.crearIngreso(ingreso);
    } catch (error) {
      console.log(error);
      throw new Error('Error al crear ingreso');
    }
  }
}
