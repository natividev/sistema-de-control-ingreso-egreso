import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GeneralesService {
  constructor(private readonly _prisma: PrismaService) {}

  async tipoDocumento() {
    return await this._prisma.tipo_documento.findMany();
  }
}
