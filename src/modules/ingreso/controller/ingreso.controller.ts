import { Controller, Post, Body } from '@nestjs/common';
import { IngresoService } from '../service/ingreso.service';
import { CreateIngresoDto } from '../dto/create-ingreso.dto';

@Controller('ingreso')
export class IngresoController {
  constructor(private readonly _ingresoService: IngresoService) {}

  @Post()
  create(@Body() createIngresoDto: CreateIngresoDto) {
    return createIngresoDto;
  }
}
