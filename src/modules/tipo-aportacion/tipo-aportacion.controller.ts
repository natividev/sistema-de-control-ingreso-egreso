import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoAportacionService } from './tipo-aportacion.service';
import { CreateTipoAportacionDto } from './dto/create-tipo-aportacion.dto';
import { UpdateTipoAportacionDto } from './dto/update-tipo-aportacion.dto';

@Controller('tipo-aportacion')
export class TipoAportacionController {
  constructor(private readonly tipoAportacionService: TipoAportacionService) {}

  @Post()
  create(@Body() createTipoAportacionDto: CreateTipoAportacionDto) {
    return this.tipoAportacionService.create(createTipoAportacionDto);
  }

  @Get()
  findAll() {
    return this.tipoAportacionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoAportacionService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoAportacionDto: UpdateTipoAportacionDto,
  ) {
    return this.tipoAportacionService.update(+id, updateTipoAportacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoAportacionService.remove(+id);
  }
}
