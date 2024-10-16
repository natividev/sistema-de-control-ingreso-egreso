import { Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  executeTransaction<T>(
    tx: Prisma.TransactionClient | undefined = undefined,
    callback: (tx: Prisma.TransactionClient) => Promise<T>,
  ) {
    if (!callback) throw new Error('You must provide a callback function');
    if (tx) return callback(tx);
    return this.$transaction((tx: Prisma.TransactionClient) => callback(tx));
  }
}
