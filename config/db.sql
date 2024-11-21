DROP DATABASE IF EXISTS lucky_momo;
CREATE SCHEMA `lucky_momo` DEFAULT CHARACTER SET utf8mb4 ;

CREATE TABLE `user_msg` (
  `use_id` bigint(20) NOT NULL,
  `msg` longtext NOT NULL COMMENT '留言内容',
  `time` bigint(20) NOT NULL COMMENT '发送时间',
  PRIMARY KEY (`use_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4