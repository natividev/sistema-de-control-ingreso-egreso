/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `log_anulacion` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_creacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `total_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - Added the required column `fk_tipo_afiliado` to the `ingreso` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aporte_proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `ingreso` ADD COLUMN `fk_tipo_afiliado` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `log_anulacion` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `total_log` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- AddForeignKey
ALTER TABLE `ingreso` ADD CONSTRAINT `ingreso_fk_tipo_afiliado_fkey` FOREIGN KEY (`fk_tipo_afiliado`) REFERENCES `afiliados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
