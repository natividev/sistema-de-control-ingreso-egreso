-- CreateTable
CREATE TABLE `afiliados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_documento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `registro_afiliado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `razon_social` VARCHAR(191) NOT NULL,
    `numero_documento` VARCHAR(191) NULL,
    `fecha` DATETIME(3) NOT NULL,
    `correo` VARCHAR(191) NULL,
    `telefono` VARCHAR(191) NULL,
    `observaciones` VARCHAR(191) NULL,
    `fk_afiliado` INTEGER NOT NULL,
    `fk_tipo_documento` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `registro_afiliado` ADD CONSTRAINT `registro_afiliado_fk_afiliado_fkey` FOREIGN KEY (`fk_afiliado`) REFERENCES `afiliados`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `registro_afiliado` ADD CONSTRAINT `registro_afiliado_fk_tipo_documento_fkey` FOREIGN KEY (`fk_tipo_documento`) REFERENCES `tipo_documento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
