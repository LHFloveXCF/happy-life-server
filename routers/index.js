'use strict';

const { log } = require('console');

let express = require('express'),
    router = express.Router(),
    logic = require('../logic/logic'),
    common = require('../logic/logicCommon'),
    iRet = common.iRET,
    CODE = require('../logic/returnObj').CODE,
    MESSAGE = require('../logic/returnObj').MESSAGE,
    fs = require('fs'),
    api_cons = require('../utils/constants_api'),
    multer = require('multer'),
    crypto = require('crypto'),
    path = require('path');

// 用于存储文件哈希值的内存对象（在实际应用中，使用数据库或文件系统）
const fileHashes = {};

// 设置Multer存储配置
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//设置跨域访问
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE");
    res.header("X-Powered-By", '3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 计算文件的MD5哈希值
function calculateHash(filePath, algorithm = 'md5', callback) {
    const hash = crypto.createHash(algorithm);
    const inputStream = fs.createReadStream(filePath);

    inputStream.on('data', (data) => {
        hash.update(data);
    });

    inputStream.on('end', () => {
        callback(null, hash.digest('hex'));
    });

    inputStream.on('error', (err) => {
        callback(err);
    });
}

// 定义文件上传API端点
router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.send({ message: 'File already exists', code: CODE.UPLOAD_ERR });
    }

    const filePath = file.path;
    // 计算上传文件的哈希值
    calculateHash(filePath, 'md5', (err, fileHash) => {
        if (err) {
            return res.send({ message: 'Error calculating hash', code: CODE.UPLOAD_ERR });
        }
        // 检查文件是否已存在
        if (fileHashes[fileHash]) {
            // 删除新上传的临时文件，因为它是一个重复的文件
            fs.unlink(filePath, (unlinkErr) => {
                if (unlinkErr) {
                    console.error('Error deleting duplicate file:', unlinkErr);
                }
                const existingFileName = fileHashes[fileHash];
                let downloadUrl = `http://localhost:18141/show/${existingFileName}`;
                res.send({ message: 'File already exists', url: downloadUrl, code: CODE.UPLOAD_REPEAT });
            });
        } else {
            // 如果文件不存在，则保存哈希值（在实际应用中，您可能还需要在数据库中保存其他信息）
            fileHashes[fileHash] = req.file.filename;
            let downloadUrl = `http://localhost:18141/show/${req.file.filename}`;
            res.send({ message: '', url: downloadUrl, code: CODE.UPLOAD_SUC });
        }
    });
});

router.post('/:action', function (req, res, next) {
    let action = req.params.action,
        reqBody = req.body,
        reqHeaders = req.headers,
        contentType,
        ip = common.getClientIp(req),
        params;
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
        case /^saveArticle$/.test(action):
            logic.saveArticle(reqBody, function (err, res) {
                if (err == null) {
                    retf(res);
                } else {
                    retf(err);
                }
            });
            break;

        case /^saveMsg$/.test(action):
            logic.saveMsg(reqBody, ip, function (err, res) {
                if (err == null) {
                    retf(res);
                } else {
                    retf(err);
                }
            });
            break;

        case /^loginBack$/.test(action):
            logic.loginBack(reqBody, function (err, res) {
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

router.get('/:action', (req, res, next) => {
    let action = req.params.action,
        reqQuery = req.query,
        reqHeaders = req.headers,
        ip = common.getClientIp(req),
        reqBody = {};
    console.log(`\n接口名称[s]：${action}\n请求体:  ${common.safeJSONStingify(reqQuery)}\n请求头:  ${common.safeJSONStingify(reqHeaders)}\n请求者IP: ${ip}`);

    if (typeof logic[action] != 'function') {
        retf(iRet(CODE.ERROR_API, MESSAGE.ERROR.ERROR_API));
        return;
    }

    switch (true) {
        case /^getMsg$/.test(action):
            logic.getMsg(reqBody, function (err, res) {
                if (err == null) {
                    retf(res);
                } else {
                    retf(err);
                }
            });
            break;
        case /^getArticle$/.test(action):
            logic.getArticle(reqBody, function (err, res) {
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

    function retf(ret) {
        console.log('响应体: ' + common.safeJSONStingify(ret) + '\n');

        if (typeof ret.status == 'undefined' && typeof ret.message == 'undefined')
            res.end(ret);
        else
            res.json(ret);
    }
})

router.all('*', function (req, res) {
    console.log(`ATTACK【URL: ${req.url}, Method: ${req.method}, Body:${common.safeJSONStingify(req.body)}, IP: ${common.getClientIp(req)}】`);
    res.json(iRet(CODE.ERROR_REQ_TYPE, MESSAGE.ERROR.ERROR_REQ_TYPE));
});

module.exports = router;