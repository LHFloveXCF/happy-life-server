const mysql = require('mysql2');
const dbConfig = require('../config/config').MYSQL_CONF;

// create the connection to database
const connection = mysql.createConnection({
  'host': dbConfig.HOST,
			'port': dbConfig.PORT,
			'user': dbConfig.USER,
			'password': dbConfig.PASS,
			'database': dbConfig.DB,
			"stringifyObjects": true,
			"multipleStatements": true
});

const pool = mysql.createPool({
	host: dbConfig.HOST,
	user: dbConfig.USER,
	database: dbConfig.DB,
	password: dbConfig.PASS,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0,
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