/*
  Warnings:

  - You are about to drop the column `fk_tipo_ingreso` on the `egreso` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `egreso` DROP FOREIGN KEY `egreso_fk_tipo_ingreso_fkey`;

-- AlterTable
ALTER TABLE `egreso` DROP COLUMN `fk_tipo_ingreso`,
    ADD COLUMN `tipo_ingresoId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `egreso` ADD CONSTRAINT `egreso_tipo_ingresoId_fkey` FOREIGN KEY (`tipo_ingresoId`) REFERENCES `tipo_ingreso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
