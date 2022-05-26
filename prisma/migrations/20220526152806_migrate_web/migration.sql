-- DropForeignKey
ALTER TABLE `factura` DROP FOREIGN KEY `Factura_pedido_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_mesa_id_fkey`;

-- DropForeignKey
ALTER TABLE `pedido` DROP FOREIGN KEY `Pedido_usuario_id_fkey`;

-- DropForeignKey
ALTER TABLE `plato_ingrediente` DROP FOREIGN KEY `Plato_Ingrediente_ingrediente_id_fkey`;

-- DropForeignKey
ALTER TABLE `plato_ingrediente` DROP FOREIGN KEY `Plato_Ingrediente_plato_id_fkey`;

-- DropForeignKey
ALTER TABLE `plato_pedido` DROP FOREIGN KEY `Plato_Pedido_pedido_id_fkey`;

-- DropForeignKey
ALTER TABLE `plato_pedido` DROP FOREIGN KEY `Plato_Pedido_plato_id_fkey`;
