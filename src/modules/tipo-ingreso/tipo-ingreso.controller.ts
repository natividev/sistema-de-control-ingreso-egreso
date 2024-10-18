import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoIngresoService } from './tipo-ingreso.service';
import { CreateTipoIngresoDto } from './dto/create-tipo-ingreso.dto';
import { UpdateTipoIngresoDto } from './dto/update-tipo-ingreso.dto';

@Controller('tipo-ingreso')
export class TipoIngresoController {
  constructor(private readonly tipoIngresoService: TipoIngresoService) {}

  @Post()
  create(@Body() createTipoIngresoDto: CreateTipoIngresoDto) {
    return this.tipoIngresoService.create(createTipoIngresoDto);
  }

  @Get()
  findAll() {
    return this.tipoIngresoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoIngresoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoIngresoDto: UpdateTipoIngresoDto,
  ) {
    return this.tipoIngresoService.update(+id, updateTipoIngresoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoIngresoService.remove(+id);
  }
}
