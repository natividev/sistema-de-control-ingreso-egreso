import { Injectable } from '@nestjs/common';
import { CreateTipoIngresoDto } from './dto/create-tipo-ingreso.dto';
import { UpdateTipoIngresoDto } from './dto/update-tipo-ingreso.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoIngresoService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createTipoIngresoDto: CreateTipoIngresoDto) {
    try {
      await this._prisma.tipo_ingreso.create({
        data: createTipoIngresoDto,
      });

      return {
        message: 'El tipo de ingreso ha sido creado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this._prisma.tipo_ingreso.findMany({
        where: {
          active: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this._prisma.tipo_ingreso.findUnique({
        where: {
          id,
          active: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTipoIngresoDto: UpdateTipoIngresoDto) {
    try {
      await this._prisma.tipo_ingreso.update({
        where: {
          id,
        },
        data: updateTipoIngresoDto,
      });
      return {
        message: 'El tipo de ingreso ha sido actualizado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      await this._prisma.tipo_ingreso.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      return {
        message: 'El tipo de ingreso ha sido eliminado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
