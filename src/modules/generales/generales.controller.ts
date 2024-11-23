import { Controller, Get } from '@nestjs/common';
import { GeneralesService } from './generales.service';

@Controller('generales')
export class GeneralesController {
  constructor(private readonly generalesService: GeneralesService) {}

  @Get('tipo-documento')
  tipoDocumento() {
    return this.generalesService.tipoDocumento();
  }

  @Get('generar')
  async generar() {
    return await this.generalesService.generate();
  }

  @Get('dashboard')
  async dashboard() {
    return await this.generalesService.dashboard();
  }
}
