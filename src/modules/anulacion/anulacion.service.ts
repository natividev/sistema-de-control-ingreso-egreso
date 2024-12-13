import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAnulacionDto } from './dto/create-anulacion.dto';
import { AnulacionRepository } from './anulacion.repository';

@Injectable()
export class AnulacionService {
  constructor(private readonly anulacionRepository: AnulacionRepository) {}

  async anulacionIngreso({ id, monto, motivo }: CreateAnulacionDto) {
    const { cantidad } = await this.anulacionRepository.getIngresoById(id);

    if (monto > cantidad) {
      throw new BadRequestException(
        'El monto de anulación no puede ser mayor al monto ingresado',
      );
    }

    await this.anulacionRepository.anularIngreso(id, monto, motivo);

    if (monto === cantidad) {
      await this.anulacionRepository.liquidacionConAnulacionIngreso(id);
    }

    return {
      message: `Anulación realizada correctamente`,
    };
  }

  async anulacionEgreso({ id, monto, motivo }: CreateAnulacionDto) {
    const { cantidad } = await this.anulacionRepository.getEgresoById(id);
    console.log(cantidad);

    if (monto > cantidad) {
      throw new BadRequestException(
        'El monto de anulación no puede ser mayor al monto ingresado',
      );
    }

    await this.anulacionRepository.anularEgreso(id, monto, motivo);

    // if (monto === cantidad) {
    //   await this.anulacionRepository.liquidacionConAnulacionEgreso(id);
    // }

    return {
      message: `Anulación realizada correctamente`,
    };
  }
}
