import { Controller, Get, Post, Body } from '@nestjs/common';
import { CategoriaProyectoService } from './categoria-proyecto.service';
import { CreateCategoriaProyectoDto } from './dto/create-categoria-proyecto.dto';

@Controller('categoria-proyecto')
export class CategoriaProyectoController {
  constructor(
    private readonly categoriaProyectoService: CategoriaProyectoService,
  ) {}

  @Post()
  create(@Body() createCategoriaProyectoDto: CreateCategoriaProyectoDto) {
    return this.categoriaProyectoService.create(createCategoriaProyectoDto);
  }

  @Get()
  findAll() {
    return this.categoriaProyectoService.findAll();
  }
}
