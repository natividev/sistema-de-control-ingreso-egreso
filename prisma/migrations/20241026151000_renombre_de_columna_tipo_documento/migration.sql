/*
  Warnings:

  - Made the column `nombre` on table `tipo_documento` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `tipo_documento` MODIFY `nombre` VARCHAR(191) NOT NULL;
