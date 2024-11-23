import { Injectable } from '@nestjs/common';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';
import { IngresoRepository } from '../repository/ingreso.repository';

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
      console.log(error);
      throw new Error('Error al crear ingreso');
    }
  }
}
