var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');
var ueditor = require("ueditor");
var app = express();
var index = require('./routes/index.js');

// app.use(function(req, res, next) {
//     console.log('adsasd');
//     if (!req.session.user) {
//         res.redirect('/admin/login');
//     } else {
//         next();
//     }
// })
app.set('views', path.join(path.resolve(__dirname, '..'), 'dist'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
var history = require('connect-history-api-fallback');
app.use(history()) // 这里千万要注意，要在static静态资源上面
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//配置用户验证
app.use(session({
    secret: 'secret',
    resave: false,
    cookie: { maxAge: 60 * 1000 * 30 } //设置过期时间
}))

app.use("/editor/ue", ueditor(path.join(__dirname, '../dist'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/upload/images';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/upload/images';
        console.log(666)
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    } else if (req.query.action === 'uploadvideo') {
        var foo = req.ueditor;
        var date = new Date();
        var imgname = req.ueditor.filename;

        var img_url = '/upload/videos';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
    }
    // 客户端发起其它请求
    else {

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/static/Editor/jsp/config.json')
    }
}));
app.use('/', index);
// app.use('/*', function(req, res){
//     if(!req.session.islogin){

//     }
// })


//路径未匹配
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})


app.use(function(err, req, res, next) {
    // console.log(999);
    // if(!req.session){
    //     console.log(1)
    //     // res.location('/admin/login');
    //    // res.set(200);
    //    res.location('/admin/login');
    //    res.statusCode = 301;
    //    res.end('响应的内容');
    //   // res.redirect(302,'/admin/login');
    //     return;
    // }
    // else{
    //     console.log(2)
    //     next();
    // }
    res.locals.messgae = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;