let app = require('../app'),
	mysqlC = require('../logic/logicMySQL'),
	http = require('http'),
	PORT = require('../config/config').PORT;


/**
 * Get port from environment and store in Express.
 */
let port = normalizePort(process.env.PORT || PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */
let server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
	let port = parseInt(val, 10);
	if (isNaN(port)) {
		return val;
	}

	if (port >= 0) {
		return port;
	}

	return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
	if (error.syscall !== 'listen') {
		throw error;
	}

	let bind = typeof port === 'string'
		? 'Pipe ' + port
		: 'Port ' + port;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
			break;
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
			break;
		default:
			throw error;
	}
}

/**
 * Event listener for HTTP server "listening" event. 
 */
function onListening() {
	let addr = server.address();
	let bind = typeof addr === 'string'
		? 'pipe ' + addr
		: 'port ' + addr.port;
	console.info("==> Listening on %s. ", bind);
}

// 文件缓存
let fileHashes = {};
function setFileCache(fileCacheData) {
    fileCacheData.map(item => {
        fileHashes[item.file_md5] = item.file_path;
    });
};

// 创建数据库连接并执行查询
(async function initializeDatabase() {
	let sql = "SELECT * FROM file;";
	let params = [];
	mysqlC.executeQuery(sql, params, (error, results) => {
		if (error) {
		} else {
			setFileCache(results);
		}
	});
})();

function checkFileExists(fileMd5) {
	return fileHashes[fileMd5];
}

function addFileCache(fileMd5, filePath) {
	fileHashes[fileMd5] = filePath;
}

exports.addFileCache = addFileCache;
exports.checkFileExists = checkFileExists;