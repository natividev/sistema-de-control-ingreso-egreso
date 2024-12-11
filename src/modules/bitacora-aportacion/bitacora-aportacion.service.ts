import { Injectable } from '@nestjs/common';
import { CreateBitacoraAportacionDto } from './dto/create-bitacora-aportacion.dto';
import { BitacoraAportacionRepository } from './bitacora-aportacion.repository';
import { ProyectoBitacoraMapper } from './mapper';

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
}
