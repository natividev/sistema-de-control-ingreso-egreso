-- AlterTable
ALTER TABLE `total_log` ADD COLUMN `fk_egreso` INTEGER NULL,
    ADD COLUMN `fk_ingreso` INTEGER NULL;

-- CreateIndex
CREATE INDEX `total_log_fk_ingreso` ON `total_log`(`fk_ingreso`);

-- CreateIndex
CREATE INDEX `total_log_fk_egreso` ON `total_log`(`fk_egreso`);

-- AddForeignKey
ALTER TABLE `total_log` ADD CONSTRAINT `total_log_fk_ingreso_fkey` FOREIGN KEY (`fk_ingreso`) REFERENCES `ingreso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `total_log` ADD CONSTRAINT `total_log_fk_egreso_fkey` FOREIGN KEY (`fk_egreso`) REFERENCES `egreso`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
