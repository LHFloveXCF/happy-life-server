"use strict";
exports.CODE = {
	SUCCESS: 100,						//接口请求成功
	ERROR_API: 101,						//不存在该API
	ERROR_MIME_TYPE: 102,				//请求体的MIME-TYPE错误
	ERROR_EMPTY_BODY: 103,				//空的请求体
	ERROR_REQ_TYPE: 104,				//请求方式错误
	ERROR_PARAM: 105,					//请求参数异常
	ERROR_DATA_DECRYPT: 106,			//数据解密错误
	ERROR_DATA_RESOLVE: 107,			//数据解析错误
	ERROR_REQ: 108,						//接口请求失败
	ERROR_INTERNAL: 109,				//服务器内部错误: GM 服务器
	ERROR_INTERNAL_G: 110,				//服务器内部错误: 游戏服务器通信错误
	ERROR_INTERNAL_D: 111,				//服务器内部错误: DbCloud通信错误
	ERROR_INTERNAL_Y: 114,				//服务器内部错误：运维平台通信错误
	ERROR_EMPTY_SERVER: 112,			//空的服务器请求地址
	REQUEST_TIME_OUT: 113,				//服务请求超时
	UPLOAD_ERR: 114,
	UPLOAD_REPEAT: 115,
	UPLOAD_SUC: 116,
};

exports.MESSAGE = {
	SUCCESS: {
		SUCCESS: '接口请求成功',
		SUCCESS_UPLOAD: '文件上传成功',
		LOG_INSERT: 'GM行为日志记录成功',
		LOG_EXEC_STATE_UPDATE: '变更请求日志的执行状态成功',
		LOG_QUERY: 'GM行为日志查询成功',

		ROLE_GROUP_ADD: '新角色添加成功',
		ROLE_GROUP_UPDATE: '角色修改成功',
		ROLE_GROUP_QUERY: '角色查询成功',

		USER_ADD: '新用户添加成功',
		USER_QUERY: '用户查询成功',
		USER_DELETE: '用户删除成功',
		USER_UPDATE: '用户修改成功',
		USER_PASS_UPDATE: '用户密码修改成功',
		USER_PASS_RESET: '用户密码重置成功',

		LOGIN_CHECKED: '管理后台登录成功',
	},
	ERROR: {
		ERROR_API: '请核实请求接口名称',
		ERROR_MIME_TYPE: '请修改请求体MIME类型为 application/json',
		ERROR_MIME_TYPE_FORM_DATA: '请修改请求体MIME类型为 multipart/form-data',
		ERROR_MIME_TYPE_: '请修改请求体MIME类型为 application/x-www-form-urlencoded',
		ERROR_EMPTY_BODY: '请求体不能为空',
		ERROR_REQ_TYPE: '请求方式错误或API不存在',
		ERROR_PARAM: '前端填写参数异常，请核对后重新提交请求',
		ERROR_PARAM_FORMAT: '请校验参数的数据类型',
		ERROR_DATA_DECRYPT: '数据解密错误',
		ERROR_DATA_RESOLVE: '数据解析错误',
		ERROR_REQ: '接口请求失败',
		ERROR_INTERNAL: '服务器内部错误',
		ERROR_INTERNAL_G: '与游戏服务器通信异常',
		ERROR_INTERNAL_D: '与数据中心通信异常',
	}
};

exports.RET = {
	status: 0,
	message: ''
};