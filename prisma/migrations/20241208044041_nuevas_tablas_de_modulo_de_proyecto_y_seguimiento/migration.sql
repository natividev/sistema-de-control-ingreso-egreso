/*
  Warnings:

  - You are about to alter the column `fecha` on the `total_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `total_log` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();

-- CreateTable
CREATE TABLE `proyecto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `fecha` DATE NOT NULL,
    `ubicacion` JSON NULL,
    `cantidad` DOUBLE NOT NULL,
    `observacion` VARCHAR(191) NULL,
    `tipo_participante` JSON NULL,
    `fk_categoria_proyecto_id` INTEGER NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `proyecto_fk_categoria_idx`(`fk_categoria_proyecto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categoria_proyecto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `categoria_proyecto_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_participante` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aporte_proyecto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATE NOT NULL,
    `nombre_persona` VARCHAR(191) NOT NULL,
    `fk_proyecto_id` INTEGER NOT NULL,
    `fk_tipo_aporte_id` INTEGER NOT NULL,
    `cantidad` VARCHAR(191) NOT NULL,
    `observaciones` VARCHAR(191) NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME NOT NULL DEFAULT NOW(),
    `fecha_actualizacion` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW(),

    INDEX `aporte_proyecto_fk_proyecto_id_idx`(`fk_proyecto_id`),
    INDEX `aporte_proyecto_fk_tipo_aporte_id_idx`(`fk_tipo_aporte_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_aporte` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `active` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proyecto` ADD CONSTRAINT `proyecto_fk_categoria_proyecto_id_fkey` FOREIGN KEY (`fk_categoria_proyecto_id`) REFERENCES `categoria_proyecto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aporte_proyecto` ADD CONSTRAINT `aporte_proyecto_fk_proyecto_id_fkey` FOREIGN KEY (`fk_proyecto_id`) REFERENCES `proyecto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aporte_proyecto` ADD CONSTRAINT `aporte_proyecto_fk_tipo_aporte_id_fkey` FOREIGN KEY (`fk_tipo_aporte_id`) REFERENCES `tipo_aporte`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
