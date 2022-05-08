/*
  Warnings:

  - You are about to drop the column `estado` on the `pedido` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `pedido` DROP COLUMN `estado`;

-- AlterTable
ALTER TABLE `plato_pedido` ADD COLUMN `estado` ENUM('En_Proceso', 'Confirmado', 'Acabado', 'Rechazado') NOT NULL DEFAULT 'En_Proceso';
