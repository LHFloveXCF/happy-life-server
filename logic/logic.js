"use strict";

let mysqlC = require('../logic/logicMySQL'),
    common = require('./logicCommon'),
    CODE = require('./returnObj').CODE,
    MESSAGE = require('./returnObj').MESSAGE,
    iRET = common.iRET;

/**
 * GM用户行为日志插入
 * @param {Object} reqBody
 * @param {String} ip
 * @param {Function} callBack
 * */
function logInsert(reqBody, ip, callBack) {
    mysqlC.acquire(function (err, client) {
        if (err) {
            console.error(err.stack);
            mysqlC.release(client);
            callBack(iRET(CODE.ERROR_INTERNAL, err.stack), null);
            return;
        }

        let content = reqBody.content.replace(/\\/g, '\\\\').replace(/'/g, '\\\'');
        let sql = `CALL ${common.DSP.OPERATE_LOG_INSERT}(` +
            `'${reqBody.userNickName !== void 0 ? reqBody.userNickName : ''}', ` +
            `'${ip}', ` +
            `'IP地点获取服务已禁用', ` +
            `'${reqBody.optType !== void 0 ? reqBody.optType : ''}', ` +
            `'${reqBody.content !== void 0 ? content : ''}')`;

        client.query(sql, function (err, rows) {
            if (err) {
                console.error(err.stack);
                callBack(iRET(CODE.ERROR_INTERNAL, err.stack), null);
                mysqlC.release(client);
                return;
            }

            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.LOG_INSERT, rows[0][0]));
            mysqlC.release(client);
        });
    });
};

function test(reqBody, callBack) {
    callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
};

function saveMsg(reqBody, ip, callBack) {
    let params = ['1', reqBody.content]
    let sql = "INSERT INTO `msg` (`user_id`, `msg`, `time`) VALUES (?, ?, NOW());";
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
        }
    });
};

function getMsg(reqBody, callBack) {
    let sql = "SELECT * FROM msg;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {            
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT, results));
        }
    });
};

function getArticle(reqBody, callBack) {
    let sql = "SELECT * FROM article;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {            
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT, results));
        }
    });
};

function saveArticle(reqBody, callBack) {    
    let sql = "INSERT INTO `article` (`user_id`, `article_title`, `article_icon`, `article_content`, `article_keys`) VALUES (?, ?, ?, ?, ?);";
    let params = [1, reqBody.title, reqBody.image, reqBody.article, 'test, test']
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {            
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
        }
    });
};

exports.saveArticle = saveArticle;
exports.getArticle = getArticle;
exports.getMsg = getMsg;
exports.saveMsg = saveMsg;
exports.logInsert = logInsert;