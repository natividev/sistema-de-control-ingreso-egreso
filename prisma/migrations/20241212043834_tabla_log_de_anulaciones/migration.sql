/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_creacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `total_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `aporte_proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `total_log` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `log_anulacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME NOT NULL DEFAULT NOW(),
    `monto_original` DOUBLE NULL,
    `monto_anulado` DOUBLE NOT NULL,
    `fk_ingreso` INTEGER NULL,
    `fk_egreso` INTEGER NULL,
    `tipo_anulacion` ENUM('INGRESO', 'EGRESO') NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    INDEX `log_anulacion_fk_ingreso`(`fk_ingreso`),
    INDEX `log_anulacion_fk_egreso`(`fk_egreso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `log_anulacion` ADD CONSTRAINT `log_anulacion_fk_ingreso_fkey` FOREIGN KEY (`fk_ingreso`) REFERENCES `ingreso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log_anulacion` ADD CONSTRAINT `log_anulacion_fk_egreso_fkey` FOREIGN KEY (`fk_egreso`) REFERENCES `egreso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
