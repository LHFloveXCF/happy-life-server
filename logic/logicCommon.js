
let path = require('path')

const cookiesOfThirtySixPath = path.resolve(__dirname, '..') + '/config/cookiesOfThirtySix.txt';

/**
 * 获取请求者的IP
 * @param {Object} req 请求者原串信息
*/
function getClientIp(req) {
    var ip_addr = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    //::ffff:127.0.0.1
    ip_addr = ip_addr.replace(/:/g, '').replace(/ffff/g, '');
    return ip_addr;
}

function iRET(status, message, data = null) {
    let RET = require('./returnObj').RET;
    RET.status = status;
    RET.message = message;
    if (data !== null)
        RET.data = data;
    else
        delete RET.data;
    return RET;
}
function safeJSONStingify(jsonObj) {
    var str = '';
    try {
        str = JSON.stringify(jsonObj);
    } catch (e) {
        str = require("json-stringify-safe")(jsonObj);
    }
    return str;
}
function verifyParam(modelParams, params) {
    let org = modelParams,
        cloned = merge(true, org);
    merge(cloned, params);

    for (var i in org) {
        ;
        //判断参数中是否该有的字段齐全
        if (org[i] == cloned[i]) {
            console.log(org[i]);
            console.log(cloned[i]);
            return false;
        }

        //判断参数中是否有为空的字段
        if (0 == (cloned[i] + "").replace(/(^s*)|(s*$)/g, "").length) {
            return false;
        }
    }
    return true;
}

exports.iRET = iRET;
exports.getClientIp = getClientIp;
exports.safeJSONStingify = safeJSONStingify;
exports.verifyParam = verifyParam;

