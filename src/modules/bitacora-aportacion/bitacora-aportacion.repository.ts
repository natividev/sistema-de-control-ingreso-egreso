import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AporteProyecto } from './interfaces/create-bitacora-de-aportacion';
import { Prisma } from '@prisma/client';
import pageBuilder from 'src/helpers/page-builder';
import { FilterQueryParams } from '../proyecto/dto/filter-query-params';

@Injectable()
export class BitacoraAportacionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createBitacora(createBitacoraAportacionDto: AporteProyecto) {
    await this.prisma.aporte_proyecto.create({
      data: createBitacoraAportacionDto,
    });

    return {
      message: 'Bitacora creada correctamente',
    };
  }

  async updateBitacora(
    updateBitacoraAportacionDto: AporteProyecto,
    id: number,
  ) {
    await this.prisma.aporte_proyecto.update({
      where: {
        id: id,
      },
      data: updateBitacoraAportacionDto,
    });

    return {
      message: 'Bitacora actualizada correctamente',
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async findAllBitacora({ desde, hasta, page, limit }: FilterQueryParams) {
    const query = Prisma.sql`SELECT * from aporte_proyecto p`;

    return await pageBuilder(this.prisma, {
      query,
      page,
      limit,
      orderBySql: {
        desc: 'p.id',
      },
    });
  }
}
