/*
  Warnings:

  - You are about to drop the column `descripcion` on the `tipo_documento` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `tipo_documento` DROP COLUMN `descripcion`,
    ADD COLUMN `nombre` VARCHAR(191) NULL;
