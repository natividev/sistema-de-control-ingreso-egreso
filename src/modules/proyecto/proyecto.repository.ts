import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ProyectoCreateData } from './interfaces';
import { Prisma } from '@prisma/client';
import pageBuilder from 'src/helpers/page-builder';
import { FilterQueryParams } from './dto/filter-query-params';

@Injectable()
export class ProyectoRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createProyecto(createProyectoDto: ProyectoCreateData) {
    console.log(createProyectoDto);
    await this.prisma.proyecto.create({
      data: createProyectoDto,
    });

    return {
      message: 'Proyecto creado correctamente',
    };
  }

  async updateProyecto(updateProyectoDto: ProyectoCreateData, id: number) {
    await this.prisma.proyecto.update({
      where: {
        id: id,
      },
      data: updateProyectoDto,
    });

    return {
      message: 'Proyecto actualizado correctamente',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAll({ desde, hasta, page, limit }: FilterQueryParams) {
    const query = Prisma.sql`SELECT * from proyecto p`;

    return await pageBuilder(this.prisma, {
      query,
      page,
      limit,
      orderBySql: {
        desc: 'p.id',
      },
    });
  }

  async findAllList() {
    return await this.prisma.proyecto.findMany({
      select: {
        id: true,
        nombre: true,
      },
    });
  }

  async findAllTipoAportacion() {
    return await this.prisma.tipo_aporte.findMany();
  }
}
