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
CREATE TABLE `menu` (
    `menu_id` INT UNSIGNED NOT NULL,
    `name` VARCHAR(50),
    `description` VARCHAR(255),
    `unit` VARCHAR(10),
    `price` DECIMAL(10, 2),
    PRIMARY KEY (`menu_id`)
);
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
    `order_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `receipt_id` INT UNSIGNED,
    `menu_id` INT UNSIGNED,
    `tables_id` INT UNSIGNED,
    `created` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `served` DATETIME,
    `isValid` BOOLEAN DEFAULT TRUE,
    PRIMARY KEY (`order_id`),
    FOREIGN KEY (`receipt_id`) REFERENCES `receipt`(`receipt_id`)
);