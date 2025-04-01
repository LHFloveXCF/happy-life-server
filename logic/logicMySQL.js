const mysql = require('mysql2');
const dbConfig = require('../config/serverConfig');

// 修改为正确访问 MYSQL_CONF 配置
const pool = mysql.createPool({
    host: dbConfig.MYSQL_CONF.HOST,
    port: dbConfig.MYSQL_CONF.PORT,
    user: dbConfig.MYSQL_CONF.USER,
    password: dbConfig.MYSQL_CONF.PASS,
    database: dbConfig.MYSQL_CONF.DB,
});


function executeQuery(sql, params, callback) {
	pool.getConnection((err, connection) => {
	  if (err) {
		return callback(err, null);
	  }

	  connection.execute(sql, params, (error, results, fields) => {
		connection.release();
		if (error) {
		  return callback(error, null);
		}
		callback(null, results);
	  });
	});
  }
   
  // 导出executeQuery函数，以便在其他文件中使用
  module.exports = {
	executeQuery
  };