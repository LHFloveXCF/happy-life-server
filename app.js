
let express = require('express'),
    path = require('path'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    index = require('./routers/index'),
    app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));													//将请求信息打印在控制台
app.use(bodyParser.json({ limit: '50mb' }));							//使用JSON有效负载解析传入的请求。控制json最大请求体大小50mb
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));		//使用urlencoded有效负载解析传入的请求。使用querystring库解析URL编码数据；最大请求体大小50mb
app.use(cookieParser());												//读取cookie
app.use(express.static(path.join(__dirname, 'public')));				//提供静态文件
app.use('/show', express.static('uploads'));

//前后端分离，协议接口细化
app.use('/api/', index);			//POST 处理GM系统内部逻辑; GET 静态资源下载

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.log('异常, 信息如下: ');
        console.log(err);
        res.status(err.status || 500);
        res.json({
            status: 500,
            message: '捕捉到未定义的异常'
        });
    });
}

app.use(function (err, req, res, next) {
    console.log('异常, 信息如下: ');
    console.log(err);
    res.status(err.status || 500);
    res.json({
        status: 500,
        message: '捕捉到未定义的异常'
    });
});

module.exports = app;
