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

exports.pool = mysql.createPool({
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