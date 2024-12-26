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

// 保存留言
function saveMsg(reqBody, ip, callBack) {
    let params = ['1', reqBody.content]
    let sql = "INSERT INTO `msg` (`user_id`, `msg`, `time`) VALUES (?, ?, NOW());";
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MSG_SAVE));
        }
    });
};
// 查询全部留言
function getMsg(reqBody, callBack) {
    let sql = "SELECT * FROM msg;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.MSG_LOOK, results));
        }
    });
};
// 查询全部文章
function getArticle(reqBody, callBack) {
    let sql = "SELECT * FROM article;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ARTICLE_LOOK, results));
        }
    });
};
// 保存文章
function saveArticle(reqBody, callBack) {
    let sql = "INSERT INTO `article` (`user_id`, `article_title`, `article_icon`, `article_content`, `article_keys`, `article_time_create`, `article_time_update`, `article_state`) VALUES (?, ?, ?, ?, ?, ?, ?, ?);";
    let time = new Date().getTime();
    let params = [1, reqBody.title, reqBody.image, reqBody.article, 'test, test', time, 0, 0];
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ARTICLE_SAVE));
        }
    });
};
// 保存文件md5 路径信息
function saveFilePath(fileParams, callBack) {
    let sql = "INSERT INTO `file` (`file_md5`, `file_path`) VALUES (?, ?);";
    let params = [fileParams.fileMd5, fileParams.filePath];
    mysqlC.executeQuery(sql, params, (error, results) => {
        
    });
};

// 用户注册
function userRigster(reqBody, callBack) {
    let sql = "INSERT INTO `user` (`user_name`, `pass_word`, `user_email`, `user_avatar`, `role_id`) VALUES (?, ?, ?, ?, ?);";
    mysqlC.executeQuery(sql, [reqBody.username, reqBody.password, reqBody.email, reqBody.avatar, 3], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.USER_ADD, results));
            }
        }
    });
};
// 登录管理后台
function loginBack(reqBody, callBack) {
    let sql = "select * from role_permission rp join (SELECT role_id, user_id FROM user  where user_id = ? and pass_word = ?) u where rp.role_id = u.role_id;";
    mysqlC.executeQuery(sql, [reqBody.userName, reqBody.passWord], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results.length === 0) {
                // 没有查询到数据
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.LOGIN_CHECKED_FAIL, results));
            } else {
                const user = results[0];
                let userInfo = {
                    "userId": user.user_id,
                    "roleId": user.role_id,
                    "userName": user.user_name
                }
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.LOGIN_CHECKED, userInfo));
            }
        }
    });
};
// 删除文章
function deleteArticle(reqBody, callBack) {
    let sql = "delete from article where id = ?;";
    mysqlC.executeQuery(sql, [reqBody.id], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ARTICLE_DELETE, results));
            }
        }
    });
};
// 查询全部图片
function getImages(reqBody, callBack) {
    let sql = "SELECT * FROM file;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.IMAGE_LOOK, results));
        }
    });
};
// 删除图片
function deleteImage(reqBody, callBack) {
    let sql = "delete from file where file_id = ?;";
    mysqlC.executeQuery(sql, [reqBody.id], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.IMAGE_DELETE, results));
            }
        }
    });
};
// 查询全部图片
function getUser(reqBody, callBack) {
    let sql = "SELECT * FROM user;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.USER_QUERY, results));
        }
    });
};
// 删除用户
function deleteUser(reqBody, callBack) {
    let sql = "delete from user where user_id = ?;";
    mysqlC.executeQuery(sql, [reqBody.id], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.USER_DELETE, results));
            }
        }
    });
};
// 查询全部角色
function getRole(reqBody, callBack) {
    let sql = "SELECT * FROM role;";
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ROLE_GROUP_QUERY, results));
        }
    });
};
// 删除角色
function deleteRole(reqBody, callBack) {
    let sql = "delete from role where role_id = ?;";
    mysqlC.executeQuery(sql, [reqBody.id], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ROLE_GROUP_UPDATE, results));
            }
        }
    });
};
// 更新角色
function updateRole(reqBody, callBack) {
    let sql = "UPDATE `role` SET `role_id` = ?, `role_name` = ?, `role_desc` = ? WHERE (`id` = ?);";
    mysqlC.executeQuery(sql, [reqBody.roleId, reqBody.name, reqBody.desc, reqBody.id], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ROLE_GROUP_UPDATE, results));
            }
        }
    });
};
// 新增角色
function addRole(reqBody, callBack) {
    let sql = "INSERT INTO `role` (`role_id`, `role_name`, `role_desc`) VALUES (?, ?, ?);";
    mysqlC.executeQuery(sql, [reqBody.roleId, reqBody.name, reqBody.desc], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results[0] !== null) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ROLE_GROUP_ADD, results));
            }
        }
    });
};
// 查询全部文章评论
function getArticleMsg(reqBody, callBack) {
    let sql = "SELECT * FROM article_msg where article_id = ?;";    
    let params = [reqBody.articleId]
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ARTICLE_MSG_LOOK, results));
        }
    });
};
// 新增文章评论
function addOneArticleMsg(reqBody, callBack) {
    let sql = "INSERT INTO `article_msg` (`msg_from`, `msg_to`, `article_id`, `msg_time_create`, `msg`) VALUES (?, ?, ?, ?, ?);";
    let time = new Date().getTime();
    mysqlC.executeQuery(sql, [reqBody.userId, reqBody.toUserId, reqBody.articleId, time, reqBody.content], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results.length !== 0) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.ARTICLE_MSG_ADD, results));
            }
        }
    });
};
// 新增说说
function addOneSay(reqBody, callBack) {
    console.log("variableName:", reqBody);
    let sql = "INSERT INTO `say` (`user_id`, `time`, `content`, `to_user_id`, `user_avatar`) VALUES (?, ?, ?, ?, ?);";
    
    let time = new Date().getTime();
    let toUserId = 0;
    if (reqBody.toUserId) {
        toUserId = reqBody.toUserId;
    };
    mysqlC.executeQuery(sql, [reqBody.userId, time, reqBody.content, toUserId, reqBody.avatar], (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            if (results.length !== 0) {
                callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.SAY_ADD, results));
            }
        }
    });
};
// 查询全部说说
function getSay(reqBody, callBack) {
    let sql = "select s.*, u.user_name from say s join user u on s.user_id = u.user_id;";    
    let params = []
    mysqlC.executeQuery(sql, params, (error, results) => {
        if (error) {
            callBack(iRET(CODE.ERROR_INTERNAL, error.stack), null);
        } else {
            callBack(null, iRET(CODE.SUCCESS, MESSAGE.SUCCESS.SAY_LOOK, results));
        };
    });
};
exports.getSay = getSay;
exports.addOneArticleMsg = addOneArticleMsg;
exports.addOneSay = addOneSay;
exports.getArticleMsg = getArticleMsg;
exports.addRole = addRole;
exports.updateRole = updateRole;
exports.deleteRole = deleteRole;
exports.getRole = getRole;
exports.getUser = getUser;
exports.deleteUser = deleteUser;
exports.userRigster = userRigster;
exports.deleteImage = deleteImage;
exports.getImages = getImages;
exports.deleteArticle = deleteArticle;
exports.saveFilePath = saveFilePath;
exports.loginBack = loginBack;
exports.saveArticle = saveArticle;
exports.getArticle = getArticle;
exports.getMsg = getMsg;
exports.saveMsg = saveMsg;
exports.logInsert = logInsert;