var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var session = require('express-session');

var app = express();
var index = require('./routes/index.js');

app.set('views', path.join(path.resolve(__dirname, '..'), 'dist'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', index);
app.use('/*', function(req, res){
    if(!req.session.islogin){

    }
})

//路径未匹配
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//配置用户验证
app.use(session({
    secret: 'secret',
    resave: false,
    cookie: {maxAge: 60*1000*30} //设置过期时间
}))

app.use(function(err, req, res, next) {
    res.locals.messgae = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;