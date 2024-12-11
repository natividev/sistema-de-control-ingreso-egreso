import { Injectable } from '@nestjs/common';
import { CreateCategoriaProyectoDto } from './dto/create-categoria-proyecto.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriaProyectoService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoriaProyectoDto: CreateCategoriaProyectoDto) {
    return createCategoriaProyectoDto;
  }

  async findAll() {
    return await this.prisma.categoria_proyecto.findMany();
  }
}
