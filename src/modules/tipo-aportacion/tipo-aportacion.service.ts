import { Injectable } from '@nestjs/common';
import { CreateTipoAportacionDto } from './dto/create-tipo-aportacion.dto';
import { UpdateTipoAportacionDto } from './dto/update-tipo-aportacion.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TipoAportacionService {
  constructor(private readonly _prisma: PrismaService) {}
  async create(createTipoAportacionDto: CreateTipoAportacionDto) {
    try {
      await this._prisma.tipo_aportacion.create({
        data: createTipoAportacionDto,
      });

      return {
        message: 'El tipo de aportacion ha sido creado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findAll() {
    try {
      return await this._prisma.tipo_aportacion.findMany({
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
      return await this._prisma.tipo_aportacion.findUnique({
        where: {
          id,
          active: true,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateTipoAportacionDto: UpdateTipoAportacionDto) {
    try {
      await this._prisma.tipo_aportacion.update({
        where: {
          id,
        },
        data: updateTipoAportacionDto,
      });
      return {
        message: 'El tipo de aportacion ha sido actualizado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async remove(id: number) {
    try {
      await this._prisma.tipo_aportacion.update({
        where: {
          id,
        },
        data: {
          active: false,
        },
      });
      return {
        message: 'El tipo de aportacion ha sido eliminado',
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
