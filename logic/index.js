'use strict';
let express = require('express'),
    router = express.Router(),
    logic = require('../logic/logic'),
    common = require('../logic/logicCommon'),
    iRet = common.iRET,
    CODE = require('../logic/returnObj').CODE,
    MESSAGE = require('../logic/returnObj').MESSAGE,
    fs = require('fs'),
    path = require('path'),
    zlib = require('zlib');

//设置跨域访问
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

router.post('/:action', function (req, res, next) {
    let action = req.params.action,
        reqBody = req.body,
        reqHeaders = req.headers,
        contentType,
        ip = common.getClientIp(req),
        params,
        baseParams = {
            gameID: '',
            data: '',
            sign: ''
        };
    console.log(`\n接口名称[c]：${action}\n请求方式：POST\n请求体:  ${common.safeJSONStingify(reqBody)}\n请求头:  ${common.safeJSONStingify(reqHeaders)}\n请求者IP: ${ip}`);

    if (typeof logic[action] != 'function') {
        retf(iRet(CODE.ERROR_API, MESSAGE.ERROR.ERROR_API));
        return;
    }

    for (let key in reqHeaders) {
        if (key == 'content-type') contentType = reqHeaders[key].split(';')[0];
    }

    //限定请求体 MIME类型
    if (!/application\/json/.test(contentType)) {
        retf(iRet(CODE.ERROR_MIME_TYPE, MESSAGE.ERROR.ERROR_MIME_TYPE +
            (contentType == '' ? '.' : ', 您目前请求体MIME类型为 ' + contentType)));
        return;
    }

    //|| Object.keys(reqBody).length <= 0
    if (typeof reqBody == 'undefined' || reqBody == null || reqBody == '') {
        retf(iRet(CODE.ERROR_EMPTY_BODY, MESSAGE.ERROR.ERROR_EMPTY_BODY));
        return;
    }

    switch (true) {
        case /^logInsert$/.test(action):
            params = {
                "userNickName": "",
                "optType": "",
                "content": ""
            };

            if (!common.verifyParam(params, reqBody)) {
                retf(iRet(CODE.ERROR_PARAM, MESSAGE.ERROR.ERROR_PARAM));
                return;
            }

            logic.logInsert(reqBody, ip, function (err, res) {
                if (err == null) {
                    retf(res);
                } else {
                    retf(err);
                }
            });
            break;
        default:
            retf(iRet(CODE.ERROR_REQ_TYPE, MESSAGE.ERROR.ERROR_REQ_TYPE));
            break;
    }


	/**
	 * http响应
	 *
	 * @param {string} ret
	 * @private
	 * */
    function retf(ret) {
        console.log('响应体: ' + common.safeJSONStingify(ret) + '\n');

        if (typeof ret.status == 'undefined' && typeof ret.message == 'undefined')
            res.end(ret);
        else
            res.json(ret);
    }
});

/**
 * 文件资源操作 get 获取;delete 删除
 * 作为前端的资源文件服务器使用
 * 使用：
 * 	1、http://{ip}:{port}/{imgFullNameWithExt}																	*默认路径下的文件获取
 * 	2、http://{ip}:{port}/{imgFullNameWithExt}?path={folderPathSplitWidthUnderLine}								*指定路径下的文件获取
 *  3、http://{ip}:{port}/{imgFullNameWithExt}?path={folderPathSplitWidthUnderLine}&operate=delete				*指定路径下的文件删除
 */
router.get('/:resourceName', (req, res, next) => {
    let resourceName = req.params.resourceName,
        folderPath = req.query.path,
        operate = req.query.operate || 'get',					//操作类型，默认获取
        reqHeaders = req.headers;

    let realPath = folderPath ?
        path.resolve(__dirname, '..') + `/static/${folderPath.replace(/_/g, '/')}/${resourceName}` :
        path.resolve(__dirname, '..') + `/static/${resourceName}`;

    fs.exists(realPath, exists => {
        if (!exists) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write("This static file " + resourceName + " was not found on this server.");
            res.end();
        } else {
            let ext = path.extname(realPath);
            ext = ext ? ext.slice(1) : 'unknown';
            let contentType = common.MIME_TYPE[ext] || common.MIME_TYPE.txt;
            res.setHeader("Content-Type", contentType);

            switch (operate) {
                case 'get':
                    fs.stat(realPath, (err, stat) => {
                        let lastModified = stat.mtime.toUTCString();
                        let ifModifiedSince = "If-Modified-Since".toLowerCase();
                        res.setHeader("Last-Modified", lastModified);

                        //缓存控制
                        if (ext.match(common.EXPIRES.fileMatch)) {
                            let expires = new Date();
                            expires.setTime(expires.getTime() + common.EXPIRES.maxAge * 1000);
                            res.setHeader("Expires", expires.toUTCString());
                            res.setHeader("Cache-Control", "max-age=" + common.EXPIRES.maxAge);
                        }

                        if (reqHeaders[ifModifiedSince] && lastModified === reqHeaders[ifModifiedSince]) {
                            res.writeHead(304, "Not Modified");
                            res.end();
                        } else {
                            let raw = fs.createReadStream(realPath);
                            let acceptEncoding = reqHeaders['accept-encoding'] || '';
                            let matched = ext.match(common.COMPRESS.match);

                            //Gzip 压缩 
                            //todo 目前压缩没看出效果目前压缩没看出效果
                            if (matched && acceptEncoding.match(/\bgzip\b/)) {
                                res.writeHead(200, "Ok", { "Content-Encoding": "gzip" });
                                raw.pipe(zlib.createGzip()).pipe(res);
                            } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                                res.writeHead(200, "Ok", { "Content-Encoding": "deflate" });
                                raw.pipe(zlib.createDeflate()).pipe(res);
                            } else {
                                res.writeHead(200, "Ok");
                                raw.pipe(res);
                            }
                        }
                    });
                    break;
                case 'delete':
                    fs.unlink(realPath, (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/plain' });
                            res.write(err.message);
                            res.end();
                            return;
                        }

                        res.writeHead(200, "Ok");
                        res.end();
                    })
                    break;
                default:
                    res.writeHead(404, { 'Content-Type': 'text/plain' });
                    res.write("Opearetion Violation.");
                    res.end();
                    break;
            }
        }
    });
});

router.get('/GmLogin/Login', (req, res, next) => {
    res.json({ "status": 0, "privilege": "gm3", "account": "1" })
})

router.all('*', function (req, res) {
    console.log(`ATTACK【URL: ${req.url}, Method: ${req.method}, Body:${common.safeJSONStingify(req.body)}, IP: ${common.getClientIp(req)}】`);
    res.json(iRet(CODE.ERROR_REQ_TYPE, MESSAGE.ERROR.ERROR_REQ_TYPE));
});

module.exports = router;