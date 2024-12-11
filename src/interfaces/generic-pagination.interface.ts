import { Prisma } from '@prisma/client';
import { Sql } from '@prisma/client/runtime/library';

export interface IPaginationOptions {
  limit?: number;
  page?: number;
  where: unknown;
  select?: unknown;
  orderBy?: unknown;
}

export interface IPaginationOptionsRaw {
  query: Sql;
  limit?: number;
  page?: number;
  orderBySql?: unknown;
}
export interface IPageResponse {
  prev: number | null;
  next: number | null;
  count: number;
}

export interface IPagination<T> {
  data: T[];
  total: number;
  page: IPageResponse;
}

export interface IPrismaModel<T> {
  findMany: (args?: object) => Prisma.PrismaPromise<T[]>;
  count: (args?: object) => Prisma.PrismaPromise<number>;
}
export interface IRepositoriesPaginations<T> {
  filters: T;
  limit: number;
  page: number;
}
