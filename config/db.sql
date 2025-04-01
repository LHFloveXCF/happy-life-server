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
  `role_id` INT NOT NULL,
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
  `article_time_create` BIGINT(64) NOT NULL COMMENT '发布时间',
  `article_time_update` BIGINT(64) NOT NULL DEFAULT 0 COMMENT '修改时间',
  `article_state` INT NOT NULL DEFAULT 0  COMMENT '文章状态',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `file_id` INT NOT NULL AUTO_INCREMENT COMMENT '文件ID；自增',
  `file_md5` VARCHAR(45) NOT NULL COMMENT '文件的MD5值，唯一的',
  `file_path` VARCHAR(255) NOT NULL COMMENT '文件对应的实际路径，时间戳.文件类型',
  PRIMARY KEY (`file_id`),
  UNIQUE INDEX `file_md5_UNIQUE` (`file_md5` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '文件列表;记录用户上传的问题，节省存储空间';

CREATE TABLE `article_msg` (
  `id` INT NOT NULL AUTO_INCREMENT COMMENT '标识ID',
  `msg_from` INT NOT NULL,
  `msg_to` INT NOT NULL,
  `article_id` INT NOT NULL,
  `msg_time_create` BIGINT(64) NOT NULL,
  `msg` LONGTEXT NULL COMMENT '留言内容',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '文章评论表';

CREATE TABLE `say` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `time` BIGINT(64) NOT NULL,
  `content` LONGTEXT NOT NULL,
  `to_user_id` INT NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COMMENT = '说说';


-- 错题集主表
CREATE TABLE `wrong_questions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL COMMENT '用户ID',
  `question_id` int DEFAULT NULL COMMENT '原题ID(如果有)',
  `subject_id` int NOT NULL COMMENT '学科分类',
  `question_type` tinyint NOT NULL COMMENT '题型:1-单选,2-多选,3-填空,4-解答',
  `question_content` text NOT NULL COMMENT '题目内容',
  `correct_answer` text COMMENT '正确答案',
  `user_answer` text COMMENT '用户错误答案',
  `wrong_reason` varchar(255) DEFAULT NULL COMMENT '错误原因分类',
  `wrong_detail` text COMMENT '错误详细分析',
  `is_mastered` tinyint DEFAULT '0' COMMENT '是否已掌握:0-未掌握,1-已掌握',
  `wrong_count` int DEFAULT '1' COMMENT '错误次数',
  `first_wrong_time` datetime NOT NULL COMMENT '首次错误时间',
  `last_wrong_time` datetime NOT NULL COMMENT '最近错误时间',
  `next_review_time` datetime DEFAULT NULL COMMENT '下次复习时间',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_user_subject` (`user_id`,`subject_id`),
  KEY `idx_review_time` (`user_id`,`next_review_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='错题集主表';

-- 错题标签关联表
CREATE TABLE `wrong_question_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `wrong_question_id` int NOT NULL,
  `tag_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_wrong_question_tag` (`wrong_question_id`,`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='错题标签关联表';

-- 标签表
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `subject_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='标签表';

-- 学科分类表
CREATE TABLE `subjects` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='学科分类表';

