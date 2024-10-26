import { Controller, Get } from '@nestjs/common';
import { GeneralesService } from './generales.service';

@Controller('generales')
export class GeneralesController {
  constructor(private readonly generalesService: GeneralesService) {}

  @Get('tipo-documento')
  tipoDocumento() {
    return this.generalesService.tipoDocumento();
  }
}
