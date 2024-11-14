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

		LOGIN_CHECKED: '密码验证通过',

		GAME_LIST_ADD: '游戏列表添加成功',
		GAME_LIST_QUERY: '游戏列表查询成功',
		GAME_LIST_DELETE: '游戏列表删除成功',
		GAME_LIST_UPDATE: '游戏列表修改成功',
		GAME_KEY_UPDATE: '游戏通信秘钥修改成功',

		ISP_LIST_QUERY_BY_ISP: '运营商列表获取成功',
		GAME_SERVER_LIST_QUERY: '服务器列表查询成功',
		GAME_MENU_QUERY: '游戏权限菜单查询成功',
		RESOURCE_LIST_QUERY_BY_GAME_ID: '资源列表获取成功',

		SURVEY_LIST_QUERY: '问卷列表查询成功',
		SURVEY_QUERY: '问卷查询成功',
		SURVEY_QUESTION_TYPE_QUERY: '问卷题型查询成功',
		SURVEY_MODEL_QUERY: '问卷模版查询成功',
		SURVEY_CREATE: '创建问卷成功',
		SURVEY_MODEL_CREATE: '创建模版问卷成功',
		SURVEY_MANAGER_NAME_UPDATE: '问卷名称更新成功',
		SURVEY_MANAGER_PREFIX_UPDATE: '问卷头部说明更新成功',
		SURVEY_MANAGER_CONTENTS_UPDATE: '问卷内容更新成功',
		SURVEY_MODEL_MANAGER_NAME_UPDATE: '问卷模版名称更新成功',
		SURVEY_MODEL_MANAGER_PREFIX_UPDATE: '问卷模版头部说明更新成功',
		SURVEY_MODEL_MANAGER_CONTENTS_UPDATE: '问卷模版内容更新成功',
		SURVEY_ANSWER_RECOVERY: '问卷答案回收成功',
		SURVEY_PLUS_PAGE_VIEW: '问卷浏览量自增成功',

		MD5TEST: '加密验证通过',
		MENU_LIST_QUERY: '功能菜单列表查询成功',
		MENU_TAB_RESOURCE_LIST_QUERY: '功能菜单下资源列表查询成功',
		MENU_TAB_RESOURCE_ID_QUERY: 'Tab页对应的资源编号查询成功',
		RESOURCE_MANAGE_SHOW_UPDATE: '更新对应资源项的显示状态成功',

		ZK_CONNECT_SUCCESS: 'ZK服务成功建立链接',

		GAME_CLIENT_VERSION_SYNV_LOCAL: '游戏客户端版本同步成功',
		GAME_CLIENT_VERSION_LOCAL_QUERY: '游戏客户端版本本地记录查询成功',
		GAME_CLIENT_VERSION_LOCAL_CREATE: '游戏客户端版本本地记录创建成功',
		GAME_CLIENT_VERSION_LOCAL_UPDATE: '游戏客户端版本本地记录更新成功',
		GAME_CLIENT_VERSION_LOCAL_DELETE: '游戏客户端版本本地记录删除成功',
	

		DEL_RESOURCE: '删除资源成功',
		CREATE_REOUSRCE: '创建资源成功',
		UPDATE_RESOURCE: '更新资源成功',
		APP_MANAGER_SHOW_UPDATE: '更新应用的显示状态成功',
		DEL_APP: '删除应用成功',
		CREATE_APP: '创建应用成功',
		UPDATE_APP: '更新应用成功',
		APP_LIST_QUERY_BY_NAME: '应用列表查询成功',
		ROLE_GROUP_NAME_UPDATE: '用户组组名更新成功',
		ROLE_GROUP_NAME_DELETE: '用户组删除成功',
		ROLE_GROUP_PERMISSIONLIST_UPDATE: '用户组权限列表更新成功',
		CRON_TASK_CREATE: '计时任务创建成功',
		CRON_TASK_TASK_LIST: '计时任务列表查询成功',
		CRON_TASK_TASK_DELETE: '计时任务删除成功',
		UPLOAD_FILE_EXISTS: '欲上传的文件已经存在于资源服务器，强制覆盖请修改上传标识',

		SERVER_LIST_ADD: '服务器添加成功',
		SERVER_LIST_UPDATE: '服务器更新成功',
		SERVER_LIST_DELETE: '服务器删除成功',
		GAME_SERVER_LIST_QUERY_FROM_ZK: '当前游戏服务端版本列表查询成功',
		GAME_SERVER_LIST_PUBLISH_TO_ZK: '服务器配置发布成功',
		GMAE_SERVER_DELETE_FROM_ZK: '服务器配置删除成功【本地&&线上】',
		GAME_SERVER_DELETE_FROM_DB: '服务器配置已从本地删除',
		ZK_NODE_DELETEED: 'ZK节点删除成功',
		ZK_HAVE_NO_NODE: 'ZK不存在该节点',

		MULTILINGUAL_SEARCH:'多语言列表搜索成功',
		MULTILINGUAL_UPDATE:'多语言列表修改成功',
		MULTILINGUAL_INSERT:'多语言列表插入成功',
		MULTILINGUAL_DELETE:'多语言列表删除成功',

		BLACK_WHITE_SEARCH:'黑白列表搜索成功',
        BLACK_WHITE_UPDATE:'黑白列表更新成功',
        BLACK_WHITE_INSERT:'黑白列表插入成功',
		BLACK_WHITE_DELETE:'黑白列表删除成功',

		DEV_OPS_NO_DATA: '运维平台不存在该服务器的信息',
		GAME_WORLDS_PUBLISH: '服务器信息发布成功'
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

		ERROR_LOGIN_PASS: '用户密码错误',
		ERROR_LOGIN_PASS_TIME_OUT: '该用户密码过期，请联系GM辅助修改密码',
		ERROR_NO_USER: '该用户不存在',
		ERROR_NO_SERVER: '该服务器编号不存在',
		ERROR_NO_ROLE: '该角色组不存在',
		ERROR_NO_GAME: '该游戏不存在',
		ERROR_NO_SURVEY: '该问卷编号不存在',
		ERROR_NO_SURVEY_MODEL: '该模版问卷编号不存在',
		ERROR_DUM_NICK_NAME: '重复的昵称',
		ERROR_DUM_ROLE_NAME: '重复的角色名',
		ERROR_DUM_GAME_INFO: '重复的游戏ID 或 游戏名称',
		ERROR_DUM_SURVEY_NAME: '重复的问卷名称',
		ERROR_DUM_SERVER_ID: '重复的服务器编号',
		MD5TEST: '加密验证失败',
		ERROR_NO_RESOURCE_ID: '该资源不存在',
		ERROR_EMPTY_SERVER: '空的服务器请求地址',

		GAME_CLIENT_HISTORY_VERSION_SYNV_LOCAL: '游戏客户端版本历史本地同步失败, 请核对发布编号！',
		ZK_CONNECT_FAILURE: 'ZK服务已断开链接，请重新建立链接',
		ZK_CONFIG_PATH_ERROR: 'ZK服务根目录不存在，请联系运维配置',
		ZK_CONFIG_PATH_CREATE: 'ZK服务根目录创建失败',
		ZK_CONNECT_TIME_OUT: 'ZK服务链接超时',
		ZK_CONNECT_OPTION_ERROR: 'ZK服务地址或端口不合法，请到"系统配置->应用管理"下核对配置',
		ZK_NODE_DELETE_ERROR: 'ZK节点删除失败',

		ERROR_FILE_KEY: '找不到上传文件对应的键 “file” 或 文件类型不支持.',
		ERROR_FILE_PATH: '找不到上传文件对应的路径，请手动创建.',
        REQUEST_TIME_OUT: "查询请求超时，请重新执行查询操作",
        
        ERROR_AIP_AUTH: '图片审核鉴权异常',
        ERROR_DBCLOUD_NO_TASK: '找不到对应的task_id，请联系开发者找问题！'
	}
};

exports.RET = {
	status: 0,
	message: ''
};