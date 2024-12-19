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
ALTER TABLE `total_log` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `usuario` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_usuario_key`(`usuario`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
