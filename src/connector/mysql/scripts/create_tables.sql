CREATE TABLE IF NOT EXISTS `bar` (
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(45) CHARACTER SET utf8 NOT NULL DEFAULT '',
    PRIMARY KEY (`id`),
    UNIQUE KEY(`title`)
);

CREATE TABLE IF NOT EXISTS `hookah`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `title` varchar(45) CHARACTER SET utf8 NOT NULL DEFAULT '',
    `amount_tube` tinyint(2) NOT NULL DEFAULT '0',
    `bar_id` int(10) unsigned NOT NULL,
	PRIMARY KEY (`id`),
	UNIQUE KEY(`title`, `amount_tube`),
    CONSTRAINT `fk_bar_hookah` FOREIGN KEY (`bar_id`) REFERENCES `bar` (`id`) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS `order`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `customer` varchar(45) CHARACTER SET utf8 NOT NULL DEFAULT 'customer',
    `date` datetime NOT NULL,
    `amount_people` tinyint(2) NOT NULL DEFAULT '0',
    PRIMARY KEY (`id`),
    UNIQUE KEY(`customer`)
);

CREATE TABLE IF NOT EXISTS `order_hookah`(
	`id` int(10) unsigned NOT NULL AUTO_INCREMENT,
    `hookah_id` int(10) unsigned NOT NULL,
    `order_id` int(10) unsigned NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `fk_hookah_order_hookah` FOREIGN KEY (`hookah_id`) REFERENCES `hookah` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_order_order_hookah` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`) ON DELETE CASCADE
);