import { Controller, Post, Body } from '@nestjs/common';
import { BitacoraAportacionService } from './bitacora-aportacion.service';
import { CreateBitacoraAportacionDto } from './dto/create-bitacora-aportacion.dto';

@Controller('bitacora-aportacion')
export class BitacoraAportacionController {
  constructor(
    private readonly bitacoraAportacionService: BitacoraAportacionService,
  ) {}

  @Post()
  createBitacora(
    @Body() createBitacoraAportacionDto: CreateBitacoraAportacionDto,
  ) {
    return this.bitacoraAportacionService.createBitacora(
      createBitacoraAportacionDto,
    );
  }
}
