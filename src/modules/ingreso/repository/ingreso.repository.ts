import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class IngresoRepository {
  constructor(private readonly _prisma: PrismaService) {}
}
