/*
  Warnings:

  - You are about to drop the column `razon` on the `ingreso` table. All the data in the column will be lost.
  - Added the required column `id_registro_afiliado` to the `ingreso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ingreso` DROP COLUMN `razon`,
    ADD COLUMN `id_registro_afiliado` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `ingreso` ADD CONSTRAINT `ingreso_id_registro_afiliado_fkey` FOREIGN KEY (`id_registro_afiliado`) REFERENCES `registro_afiliado`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
