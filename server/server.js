var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');

var app = express();
var index = require('./routes/index.js');
var session = require('express-session');

app.set('views', path.join(path.resolve(__dirname, '..'), 'dist'))
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(path.join(path.resolve(__dirname, '..'), 'dist')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
// app.use(session());
app.use('/', index);
//路径未匹配
app.use(function(req, res, next){
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

//路径匹配错误
app.use(function(err, req, res, next){
    res.locals.messgae = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
