import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async ingresoEgreso() {
    //Hacer promise all

    const [ingreso, egreso] = await Promise.all([
      this.getIngreso(),
      this.getEgreso(),
    ]);

    return { ingreso, egreso };
  }

  async ingresoGraficaLinea() {
    return await this.getIngreso();
  }

  private async getIngreso() {
    const query = Prisma.sql`select
        DATE_FORMAT(i.fecha_actividad, '%Y-%m-%d') as fecha_actividad,
        SUM(i.cantidad) as cantidad 
      from
        ingreso i
      GROUP BY i.fecha_actividad`;

    return await this.prisma.$queryRaw<any>(query);
  }

  private async getEgreso() {
    const query = Prisma.sql`select
        DATE_FORMAT(e.fecha_actividad, '%Y-%m-%d') as fecha_actividad,
        SUM(e.cantidad) as cantidad
      from
        egreso e
      GROUP BY e.fecha_actividad`;

    const data = await this.prisma.$queryRaw<any>(query);

    return data.map((item) => {
      return { ...item, cantidad: item.cantidad * -1 };
    });
  }
}
