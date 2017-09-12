var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../mysql/connect')

var Path = '../dist/index.html';

router.get('/', function(req, res, next){
    fs.readFile(Path, function(err, data){
        if(err){
            return res.send({
                status: 0,
                info: '读取文件异常'
            });
        }
    })
})


//登陆
router.post('/admin/login', function(req, res, next){
    var username = req.body.username;
    var password = req.body.password;

    var client = db.connect();
    var result = null;
    var message = {};
    db.select(client, username, password, function(result){
        if(result[0] === undefined){
            message = {
                code: 0,
                adminCode: null,
                message: '登陆失败',
                username: null
            }
            res.json(JSON.stringify(message));
        }
        else{
            message = {
                code: 1,
                adminCode: result[0].adminCode,
                message: '登陆成功',
                username: username
            }
            res.json(JSON.stringify(message));
        }
    })
})