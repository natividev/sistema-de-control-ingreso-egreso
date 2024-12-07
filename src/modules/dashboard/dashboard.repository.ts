import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

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

  //funcion privada
  private async getIngreso() {
    return await this.prisma.ingreso.findMany({
      select: {
        fecha_actividad: true,
        cantidad: true,
      },
    });
  }

  private async getEgreso() {
    return await this.prisma.egreso.findMany({
      select: {
        fecha_actividad: true,
        cantidad: true,
      },
    });
  }
}
