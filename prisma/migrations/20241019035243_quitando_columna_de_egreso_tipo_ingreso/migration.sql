/*
  Warnings:

  - You are about to drop the column `tipo_ingresoId` on the `egreso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `egreso` DROP FOREIGN KEY `egreso_tipo_ingresoId_fkey`;

-- AlterTable
ALTER TABLE `egreso` DROP COLUMN `tipo_ingresoId`;
