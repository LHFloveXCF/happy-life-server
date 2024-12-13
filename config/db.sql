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
ALTER TABLE `user` 
ADD COLUMN `role_id` INT NULL COMMENT '角色ID' AFTER `user_avatar`;


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

CREATE TABLE `permissions` (
  `permission_id` INT NOT NULL AUTO_INCREMENT COMMENT '权限ID',
  `permission_name` VARCHAR(45) NOT NULL COMMENT '权限名字',
  `permission_desc` LONGTEXT NULL COMMENT '权限介绍',
  PRIMARY KEY (`permission_id`),
  UNIQUE INDEX `permission_name_UNIQUE` (`permission_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '权限列表';

CREATE TABLE `role` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '标识ID',
  `role_id` INT NOT NULL COMMENT '角色ID',
  `role_name` VARCHAR(45) NOT NULL COMMENT '角色名字',
  `role_desc` LONGTEXT NULL COMMENT '角色描述',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `role_id_UNIQUE` (`role_id` ASC)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '角色列表';

CREATE TABLE `role_permission` (
  `role_id` INT NOT NULL,
  `permission_id` INT NOT NULL,
  PRIMARY KEY (`role_id`, `permission_id`),
  INDEX `permission_id_idx` (`permission_id` ASC),
  CONSTRAINT `fk_role_id`
    FOREIGN KEY (`role_id`)
    REFERENCES `role` (`role_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_permission_id`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permissions` (`permission_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '角色权限关联表';

CREATE TABLE `file` (
  `file_id` INT NOT NULL COMMENT '文件ID；自增',
  `file_md5` VARCHAR(45) NOT NULL COMMENT '文件的MD5值，唯一的',
  `file_path` VARCHAR(255) NOT NULL COMMENT '文件对应的实际路径，时间戳.文件类型',
  PRIMARY KEY (`file_id`),
  UNIQUE INDEX `file_md5_UNIQUE` (`file_md5` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '文件列表;记录用户上传的问题，节省存储空间';
ALTER TABLE `file` 
CHANGE COLUMN `file_id` `file_id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '文件ID；自增' ;



