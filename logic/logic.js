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
}

function test(reqBody, callBack) {
    callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
}

function saveMsg(reqBody, ip, callBack) {
    let params = ['1', reqBody.content]
    let sql = "INSERT INTO `user_msg` (`use_id`, `msg`, `time`) VALUES (?, ?, NOW());";
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, err.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
        }
    });
}

function getMsg(reqBody, ip, callBack) {
    let params = ['1', reqBody.content]
    let sql = "INSERT INTO `user_msg` (`use_id`, `msg`, `time`) VALUES (?, ?, NOW());";
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, err.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MULTILINGUAL_INSERT));
        }
    });
}

exports.getMsg = getMsg;
exports.saveMsg = saveMsg;
exports.test = test;
exports.logInsert = logInsert;