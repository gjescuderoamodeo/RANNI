-- AlterTable
ALTER TABLE `pedido` ADD COLUMN `estado` ENUM('En_Proceso', 'Confirmado', 'Acabado', 'Rechazado') NOT NULL DEFAULT 'En_Proceso';
