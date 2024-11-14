let serverConfig = require('./serverConfig')

exports.PORT = serverConfig.PORT;														    //服务对外端口

exports.REDIS_CONF = serverConfig.REDIS_CONF;	                                            //Redis 的配置

exports.MYSQL_CONF = serverConfig.MYSQL_CONF											    //MySQL 的配置;




