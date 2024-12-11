import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Prisma } from '@prisma/client';
import {
  IPagination,
  IPaginationOptions,
  IPaginationOptionsRaw,
  IPrismaModel,
} from 'src/interfaces/generic-pagination.interface';
import { PrismaService } from 'src/prisma.service';
import { getTakeAndSkip } from 'src/utils/getTakeAndSkip.interface';

async function pageBuilder<T>(
  model: PrismaService,
  options: IPaginationOptionsRaw,
): Promise<IPagination<T>>;
async function pageBuilder<T>(
  model: IPrismaModel<T>,
  options: IPaginationOptions,
): Promise<IPagination<T>>;
async function pageBuilder<T>(
  model: IPrismaModel<T> | PrismaService,
  options: IPaginationOptions | IPaginationOptionsRaw,
): Promise<IPagination<T>> {
  try {
    const { limit = 25, page = 1 } = options;
    const { skip, take } = getTakeAndSkip(limit, page);
    let data: Array<T>;
    let total: bigint | number;

    if ('query' in options) {
      if (!('$queryRaw' in model)) return;

      const { query, orderBySql } = options as IPaginationOptionsRaw;

      const orderByClause = orderBySql
        ? Prisma.sql`ORDER BY ${Prisma.raw(
            Object.entries(orderBySql)
              .map(
                ([direction, column]) => `${column} ${direction.toUpperCase()}`,
              )
              .join(', '),
          )}`
        : Prisma.empty;

      [data, total] = await Promise.all([
        model
          .$queryRaw(
            Prisma.sql`${query} ${orderByClause} LIMIT ${take} OFFSET ${skip}`,
          )
          .then((data: Array<T> | null) => (Array.isArray(data) ? data : [])),
        model
          .$queryRaw(
            Prisma.sql`SELECT COUNT(*) as total FROM (${query}) AS count`,
          )
          .then(
            ([{ total }]: { total: number }[] | null) => BigInt(total) ?? 0,
          ),
      ]);
    } else {
      if (!('findMany' in model)) return;

      const { where = {}, select, orderBy } = options as IPaginationOptions;

      [data, total] = await Promise.all([
        model.findMany({ skip, take, where, select, orderBy }),
        model.count({ where }),
      ]);
    }

    const next: number | null = total > take + skip ? page + 1 : null;
    const prev: number | null = skip > 0 ? page - 1 : null;
    const count: number = Math.ceil(Number(total) / take);

    return {
      data,
      total: Number(total),
      page: {
        next,
        prev,
        count,
      },
    };
  } catch (error) {
    Logger.error(error);
    throw new InternalServerErrorException(
      'Error al intentar realizar la búsqueda',
    );
  }
}

export default pageBuilder;
