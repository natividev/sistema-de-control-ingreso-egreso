/*
  Warnings:

  - You are about to alter the column `fecha` on the `total_log` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime`.

*/
-- AlterTable
ALTER TABLE `total_log` MODIFY `fecha` DATETIME NOT NULL DEFAULT NOW();
