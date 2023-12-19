DROP DATABASE IF EXISTS `pos`;
CREATE SCHEMA `pos`;
USE `pos`;

CREATE TABLE `tables` (
    `tables_id` INT UNSIGNED NOT NULL,
    `number` TINYINT UNSIGNED,
    `location` VARCHAR(20),
    `capacity` TINYINT UNSIGNED,
    `available` BOOLEAN,
    `reserved` BOOLEAN,
    PRIMARY KEY (`tables_id`)
);

-- SAMPLE VALUES --
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('1', '1', 'a', '4', '1', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('2', '2', 'b', '4', '1', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('3', '3', 'a', '4', '0', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('4', '4', 'b', '8', '1', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('5', '5', 'c', '12', '0', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('6', '6', 'd', '4', '0', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('7', '7', 'e', '2', '1', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('8', '8', 'a', '4', '1', '0');
INSERT INTO `pos`.`tables` (`tables_id`, `number`, `location`, `capacity`, `available`, `reserved`) VALUES ('9', '9', 'b', '8', '0', '1');

CREATE TABLE `menu` (
    `menu_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50),
    `description` VARCHAR(255),
    `unit` VARCHAR(10),
    `price` DECIMAL(10, 2),
    PRIMARY KEY (`menu_id`)
);

-- SAMPLE DATA --
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('1', 'ลาบ', 'a', 'จาน', '60');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('2', 'หลู้', 'b', 'จาน', '60');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('3', 'ส้า', 'c', 'จาน', '60');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('4', 'ข้าวผัด', 'd', 'จาน', '45');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('5', 'กะเพรา', 'e', 'จาน', '50');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('6', 'ข้าวมันไก่', 'f', 'จาน', '50');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('7', 'ข้าวขาหมู', 'g', 'จาน', '55');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('8', 'ข้าวหมูกรอบ', 'h', 'จาน', '55');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('9', 'ไข่เจียว', 'i', 'จาน', '35');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('10', 'ไข่ข้น', 'j', 'จาน', '40');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('21', 'ไข่ดาว', 'k', 'จาน', '7');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('22', 'ข้าวต้ม', 'l', 'ถ้วย', '20');
INSERT INTO `pos`.`menu` (`menu_id`, `name`, `description`, `unit`, `price`) VALUES ('36', 'สุกี้', 'm', 'ถ้วย', '45');

CREATE TABLE `receipt` (
    `receipt_id` INT UNSIGNED NOT NULL,
    `datetime` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `total` DECIMAL(10, 2),
    `vat` DECIMAL(10, 2),
    `net` DECIMAL(10, 2),
    `payment_method` VARCHAR(50),
    `isPaid` BOOLEAN DEFAULT FALSE,
    `isValid` BOOLEAN DEFAULT TRUE,
    `lastUpdate` DATETIME,
    PRIMARY KEY (`receipt_id`)
);

CREATE TABLE `orders` (
    `order_id`  INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `receipt_id` INT UNSIGNED,
    `menu_id` INT UNSIGNED,
    `tables_id` INT UNSIGNED,
    `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `served` DATETIME,
    `isValid` BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`receipt_id`) REFERENCES `receipt`(`receipt_id`)
);