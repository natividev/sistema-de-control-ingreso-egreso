import { Injectable } from '@nestjs/common';
import { CreateTipoControlDto } from './dto/create-tipo-control.dto';
import { UpdateTipoControlDto } from './dto/update-tipo-control.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoControlService {
  constructor(private readonly _prisma: PrismaService) {}

  async create(createTipoControlDto: CreateTipoControlDto) {
    try {
      await this._prisma.tipo_control.create({
        data: createTipoControlDto,
      });

      return {
        message: 'El tipo de control ha sido creado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this._prisma.tipo_control.findMany({
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
      return await this._prisma.tipo_control.findUnique({
        where: {
          id,
          active: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTipoControlDto: UpdateTipoControlDto) {
    try {
      await this._prisma.tipo_control.update({
        where: {
          id,
        },
        data: updateTipoControlDto,
      });
      return {
        message: 'El tipo de control ha sido actualizado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      await this._prisma.tipo_control.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      return {
        message: 'El tipo de control ha sido eliminado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
