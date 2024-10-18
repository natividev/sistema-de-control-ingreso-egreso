import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TipoControlService } from './tipo-control.service';
import { CreateTipoControlDto } from './dto/create-tipo-control.dto';
import { UpdateTipoControlDto } from './dto/update-tipo-control.dto';

@Controller('tipo-control')
export class TipoControlController {
  constructor(private readonly tipoControlService: TipoControlService) {}

  @Post()
  create(@Body() createTipoControlDto: CreateTipoControlDto) {
    return this.tipoControlService.create(createTipoControlDto);
  }

  @Get()
  findAll() {
    return this.tipoControlService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tipoControlService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTipoControlDto: UpdateTipoControlDto,
  ) {
    return this.tipoControlService.update(+id, updateTipoControlDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tipoControlService.remove(+id);
  }
}
