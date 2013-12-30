-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'dm_user'
--
-- ---

DROP TABLE IF EXISTS `dm_user`;

CREATE TABLE `dm_user` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL DEFAULT '',
  `password` VARCHAR(70) NOT NULL DEFAULT '',
  `company` VARCHAR(30) NOT NULL DEFAULT '',
  `contract` VARCHAR(50) DEFAULT '',
  `phone` VARCHAR(11) DEFAULT '',
  `mail` VARCHAR(50) DEFAULT '',
  `register_time` datetime,
  `last_login_time` datetime,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'dm_product'
--
-- ---

DROP TABLE IF EXISTS `dm_product`;

CREATE TABLE `dm_product` (
  `id` INT unsigned NOT NULL AUTO_INCREMENT,
  `dm_user_id`  INT unsigned NOT NULL,
  `type` TINYINT NOT NULL DEFAULT '0',
  `pubtime` datetime,
  `title` VARCHAR(30) DEFAULT '',
  `desc` text,
  `dm_dim_format_id` TINYINT DEFAULT '0',
  `dm_dim_catalog_id` TINYINT DEFAULT '0',
  `dm_dim_source_id` TINYINT DEFAULT '0',
  `dm_dim_optype_id` TINYINT DEFAULT '0',
  `tags` VARCHAR(50),
  `price` Decimal DEFAULT '0',
  `file_links` VARCHAR(60) DEFAULT '',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'dm_user_product'
--
-- ---

DROP TABLE IF EXISTS `dm_user_product`;

CREATE TABLE `dm_user_product` (
  `user_id` INT unsigned ,
  `product_id` INT unsigned ,
  `opt_type` INT NOT NULL DEFAULT '0',
  `opt_time` datetime,
  `user_ip` varchar(16) NOT NULL
);


-- ---
-- Table 'dm_dim_format'
--
-- ---

DROP TABLE IF EXISTS `dm_dim_format`;

CREATE TABLE `dm_dim_format` (
  `id` TINYINT NULL AUTO_INCREMENT,
  `format_name` VARCHAR(30) DEFAULT '',
  PRIMARY KEY (`id`)
);
INSERT INTO `dm_dim_format` (`id`, `format_name`) VALUES (1,'文本');
INSERT INTO `dm_dim_format` (`id`, `format_name`) VALUES (2,'图片');
INSERT INTO `dm_dim_format` (`id`, `format_name`) VALUES (3,'视频');
INSERT INTO `dm_dim_format` (`id`, `format_name`) VALUES (4,'音频');
-- ---
-- Table 'dm_dim_catalog'
--
-- ---

DROP TABLE IF EXISTS `dm_dim_catalog`;

CREATE TABLE `dm_dim_catalog` (
  `id` TINYINT NULL AUTO_INCREMENT,
  `catalog_name` VARCHAR(30) DEFAULT '',
  PRIMARY KEY (`id`)
);
INSERT INTO `dm_dim_catalog` (`id`, `catalog_name`) VALUES (1,'电信');
INSERT INTO `dm_dim_catalog` (`id`, `catalog_name`) VALUES (2,'金融');
INSERT INTO `dm_dim_catalog` (`id`, `catalog_name`) VALUES (3,'政府');
INSERT INTO `dm_dim_catalog` (`id`, `catalog_name`) VALUES (4,'互联网');
INSERT INTO `dm_dim_catalog` (`id`, `catalog_name`) VALUES (5,'医疗');
-- ---
-- Table 'dm_dim_source'
--
-- ---

DROP TABLE IF EXISTS `dm_dim_source`;

CREATE TABLE `dm_dim_source` (
  `id` TINYINT NULL AUTO_INCREMENT ,
  `source_name` VARCHAR(30) DEFAULT '',
  PRIMARY KEY (`id`)
);

INSERT INTO `dm_dim_source` (`id`, `source_name`) VALUES (1,'公共数据');
INSERT INTO `dm_dim_source` (`id`, `source_name`) VALUES (2,'联盟数据');
-- ---
-- Table 'dm_dim_tags'
--
-- ---


-- ---
-- Table 'dm_dim_optype'
--
-- ---

DROP TABLE IF EXISTS `dm_dim_optype`;

CREATE TABLE `dm_dim_optype` (
  `id` TINYINT NULL AUTO_INCREMENT  ,
  `opt_type` VARCHAR(30) DEFAULT '',
  PRIMARY KEY (`id`)
);

INSERT INTO `dm_dim_optype` (`id`, `opt_type`) VALUES (1,'登陆');
INSERT INTO `dm_dim_optype` (`id`, `opt_type`) VALUES (2,'查看');
INSERT INTO `dm_dim_optype` (`id`, `opt_type`) VALUES (3,'上传');
INSERT INTO `dm_dim_optype` (`id`, `opt_type`) VALUES (4,'下载');
-- ---
-- Foreign Keys
-- ---

ALTER TABLE `dm_product` ADD FOREIGN KEY (dm_user_id) REFERENCES `dm_user` (`id`);
ALTER TABLE `dm_product` ADD FOREIGN KEY (dm_dim_format_id) REFERENCES `dm_dim_format` (`id`);
ALTER TABLE `dm_product` ADD FOREIGN KEY (dm_dim_catalog_id) REFERENCES `dm_dim_catalog` (`id`);
ALTER TABLE `dm_product` ADD FOREIGN KEY (dm_dim_source_id) REFERENCES `dm_dim_source` (`id`);
ALTER TABLE `dm_product` ADD FOREIGN KEY (dm_dim_optype_id) REFERENCES `dm_dim_optype` (`id`);
ALTER TABLE `dm_user_product` ADD FOREIGN KEY (user_id) REFERENCES `dm_user` (`id`);
ALTER TABLE `dm_user_product` ADD FOREIGN KEY (product_id) REFERENCES `dm_product` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `dm_user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `dm_product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `dm_user` (`id`,`name`,`password`) VALUES
-- ('','','');
-- INSERT INTO `dm_product` (`id`,`dm_userid`) VALUES
-- ('','');
