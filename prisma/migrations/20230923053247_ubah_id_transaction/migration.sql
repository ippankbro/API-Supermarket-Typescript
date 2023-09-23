/*
  Warnings:

  - The primary key for the `transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `purchase` DROP FOREIGN KEY `Purchase_trans_id_fkey`;

-- AlterTable
ALTER TABLE `purchase` MODIFY `trans_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `transaction` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `Purchase` ADD CONSTRAINT `Purchase_trans_id_fkey` FOREIGN KEY (`trans_id`) REFERENCES `Transaction`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
