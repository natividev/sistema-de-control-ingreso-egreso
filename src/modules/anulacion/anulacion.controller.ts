import { Controller, Post, Body } from '@nestjs/common';
import { AnulacionService } from './anulacion.service';
import { CreateAnulacionDto } from './dto/create-anulacion.dto';

@Controller('anulacion')
export class AnulacionController {
  constructor(private readonly anulacionService: AnulacionService) {}

  @Post('ingreso')
  anulacionIngreso(@Body() createAnulacionDto: CreateAnulacionDto) {
    return this.anulacionService.anulacionIngreso(createAnulacionDto);
  }
}
