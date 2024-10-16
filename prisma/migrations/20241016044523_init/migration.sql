-- CreateTable
CREATE TABLE `tipo_ingreso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_control` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_aportacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ingreso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_actividad` VARCHAR(191) NOT NULL,
    `fecha_actividad` DATETIME(3) NOT NULL,
    `cantidad` DOUBLE NOT NULL,
    `razon` VARCHAR(191) NULL,
    `dui` VARCHAR(191) NULL,
    `no_transaccion` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `fk_tipo_ingreso` INTEGER NOT NULL,
    `fk_tipo_control` INTEGER NOT NULL,
    `fk_tipo_aportacion` INTEGER NOT NULL,

    INDEX `ingreso_tipo_ingreso`(`fk_tipo_ingreso`),
    INDEX `ingreso_tipo_control`(`fk_tipo_control`),
    INDEX `ingreso_tipo_aportacion`(`fk_tipo_aportacion`),
    INDEX `ingreso_fecha_actividad`(`fecha_actividad`),
    INDEX `ingreso_cantidad`(`cantidad`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `egreso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre_actividad` VARCHAR(191) NOT NULL,
    `fecha_actividad` DATETIME(3) NOT NULL,
    `cantidad` DOUBLE NOT NULL,
    `razon` VARCHAR(191) NULL,
    `dui` VARCHAR(191) NULL,
    `no_transaccion` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `fk_tipo_ingreso` INTEGER NOT NULL,
    `fk_tipo_control` INTEGER NOT NULL,
    `fk_tipo_aportacion` INTEGER NOT NULL,

    INDEX `egreso_tipo_ingreso`(`fk_tipo_ingreso`),
    INDEX `egreso_tipo_control`(`fk_tipo_control`),
    INDEX `egreso_tipo_aportacion`(`fk_tipo_aportacion`),
    INDEX `egreso_fecha_actividad`(`fecha_actividad`),
    INDEX `egreso_cantidad`(`cantidad`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `total_ingreso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `total_egreso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `monto` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `total_log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `monto_anterior` DOUBLE NOT NULL,
    `monto_nuevo` DOUBLE NOT NULL,
    `tipo` ENUM('INGRESO', 'EGRESO') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ingreso` ADD CONSTRAINT `ingreso_fk_tipo_ingreso_fkey` FOREIGN KEY (`fk_tipo_ingreso`) REFERENCES `tipo_ingreso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingreso` ADD CONSTRAINT `ingreso_fk_tipo_control_fkey` FOREIGN KEY (`fk_tipo_control`) REFERENCES `tipo_control`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ingreso` ADD CONSTRAINT `ingreso_fk_tipo_aportacion_fkey` FOREIGN KEY (`fk_tipo_aportacion`) REFERENCES `tipo_aportacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egreso` ADD CONSTRAINT `egreso_fk_tipo_ingreso_fkey` FOREIGN KEY (`fk_tipo_ingreso`) REFERENCES `tipo_ingreso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egreso` ADD CONSTRAINT `egreso_fk_tipo_control_fkey` FOREIGN KEY (`fk_tipo_control`) REFERENCES `tipo_control`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `egreso` ADD CONSTRAINT `egreso_fk_tipo_aportacion_fkey` FOREIGN KEY (`fk_tipo_aportacion`) REFERENCES `tipo_aportacion`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
