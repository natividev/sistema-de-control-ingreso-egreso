/*
  Warnings:

  - You are about to drop the column `dui` on the `egreso` table. All the data in the column will be lost.
  - You are about to drop the column `dui` on the `ingreso` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `egreso` DROP COLUMN `dui`;

-- AlterTable
ALTER TABLE `ingreso` DROP COLUMN `dui`;
