DROP DATABASE IF EXISTS lucky_momo;
CREATE SCHEMA `lucky_momo` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `user_msg` (
  `use_id` bigint(20) NOT NULL,
  `msg` longtext NOT NULL COMMENT '留言内容',
  `time` bigint(20) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`use_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
# 用户表
CREATE TABLE `user` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `pass_word` VARCHAR(45) NOT NULL,
  `user_email` VARCHAR(45) NOT NULL,
  `user_avatar` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
# 文章表
  CREATE TABLE `article` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL COMMENT '用户ID',
  `article_title` VARCHAR(255) NOT NULL COMMENT '标题',
  `article_icon` VARCHAR(255) NOT NULL COMMENT '封面图片路径',
  `article_content` LONGTEXT NOT NULL COMMENT '内容',
  `article_keys` VARCHAR(255) NOT NULL COMMENT '关键字',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

  ALTER TABLE `article` 
ADD COLUMN `article_time` BIGINT(64) NOT NULL COMMENT '发布时间' AFTER `article_keys`;
