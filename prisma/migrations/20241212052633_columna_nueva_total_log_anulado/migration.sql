/*
  Warnings:

  - You are about to alter the column `fecha_creacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `aporte_proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `log_anulacion` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_creacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha_actualizacion` on the `proyecto` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - You are about to alter the column `fecha` on the `total_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `aporte_proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `log_anulacion` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- AlterTable
ALTER TABLE `proyecto` MODIFY `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    MODIFY `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

-- AlterTable
ALTER TABLE `total_log` ADD COLUMN `anulado` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();
