const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const csurf = require('csurf');

/*
 * 响应时间中间价，会增加一个X-Response-Time头
 * https://github.com/expressjs/response-time
 * */
const responseTime = require('response-time');

/*
 * Helmet是一系列帮助增强Node.JS之Express/Connect等Javascript Web应用安全的中间件。
 * 一些著名的对Web攻击有XSS跨站脚本， 脚本注入 clickjacking 以及各种非安全的请求等对Node.js的Web应用构成各种威胁，使用Helmet能帮助你的应用避免这些攻击。
 * https://github.com/helmetjs/helmet
 * */
const helmet = require('helmet');

/*
 * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
 * https://github.com/expressjs/method-override
 * */
const methodOverride = require('method-override');

/*
 *  Node.js compression middleware.
 * https://github.com/expressjs/compression
 * */
const compress = require('compression');

const RedisStore = require('connect-redis')(session);

require('./../core/models/index'); // 链接数据库，装载models

// 自定义 权限验证相关中间件
const auth = require('./../core/middlewares/auth');

const requestLog = require('./../core/middlewares/request_log');
const renderLog = require('./../core/middlewares/render_log');

// 对res进行扩展方法
const resExtend = require('./../core/middlewares/res-extend');

const routes = require('./routes');

const config = require('./../core/config');
const logger = require('./../core/common/logger');

const app = express();
// html 文件
app.set('views', path.join(__dirname, 'public'));
// app.set('view engine', 'ejs');
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.enable('trust proxy');

// 静态资源文件
app.use('/public', express.static(path.join(__dirname, 'public')));

// 各种log
require('colors'); // 扩展了string，使输出控制台的文字有颜色
require('./../core/middlewares/mongoose_log'); // 打印 mongodb 查询日志
app.use(requestLog); // Request logger。记录请求时间
if (config.debug) { // render logger。记录渲染时间
    app.use(renderLog);
}

// t通用中间件
app.use(responseTime()); // 响应时间中间价，会增加一个X-Response-Time头
app.use(helmet.frameguard('sameorigin'));
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '1mb'}));
app.use(methodOverride());
app.use(cookieParser(config.session_secret));
app.use(compress());
app.use(session({
    secret: config.session_secret,
    // store: new RedisStore({
    //     port: config.redis_port,
    //     host: config.redis_host,
    //     db: config.redis_db,
    //     pass: config.redis_password,
    // }),
    resave: false,
    saveUninitialized: false,
}));
app.use(resExtend.resExtend);

app.use(auth.authUser); // 验证用户是否登录，从session中或者cookie中获取用户
app.use(auth.blockUser()); // 验证用户是否被锁定


if (!config.debug) {
    app.use(function (req, res, next) {
        csurf()(req, res, next);
    });

    app.set('view cache', true);
}

app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

// routes
app.use('/', routes);

// error handler 只能捕获同步错误，无法捕获异步错误
if (config.debug) {
    app.use(function (err, req, res, next) {
        logger.error(err);
        res.status(err.status || 500);
        return res.status(500).send({
            message: err.message,
            error: err
        });
    });
} else {
    app.use(function (err, req, res, next) {
        logger.error(err);
        return res.status(500).send({
            message: '500 status',
            error: {}
        });
    });
}


if (!module.parent) {
    app.listen(config.port, function () {
        logger.info('NodeClub listening on port', config.port);
        logger.info('God bless love....');
        logger.info('You can debug your app with http://' + config.hostname + ':' + config.port);
        logger.info('');
    });
}

module.exports = app;