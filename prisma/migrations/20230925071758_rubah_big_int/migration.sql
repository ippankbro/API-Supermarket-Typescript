/*
  Warnings:

  - You are about to alter the column `price` on the `barang` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `pcs_price` on the `purchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `total_price` on the `purchase` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `receipt` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `money_peek` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `change` on the `transaction` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `barang` MODIFY `price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `purchase` MODIFY `pcs_price` INTEGER NOT NULL,
    MODIFY `total_price` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `transaction` MODIFY `receipt` INTEGER NOT NULL,
    MODIFY `money_peek` INTEGER NULL,
    MODIFY `change` INTEGER NULL;
