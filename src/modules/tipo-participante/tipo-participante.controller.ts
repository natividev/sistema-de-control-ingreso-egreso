import { Controller, Get } from '@nestjs/common';
import { TipoParticipanteService } from './tipo-participante.service';

@Controller('tipo-participante')
export class TipoParticipanteController {
  constructor(
    private readonly tipoParticipanteService: TipoParticipanteService,
  ) {}

  @Get()
  findAll() {
    return this.tipoParticipanteService.findAll();
  }
}
