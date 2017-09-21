var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../mysql/connect')
var multiparty = require('multiparty');
var Path = '../../dist/index.html';
var fiter = require('../filter/filter');

//登陆
router.post('/admin/login', function(req, res, next) {
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    var client = db.connect();
    var result = null;
    var message = {};
    db.select(client, username, password, function(result) {
        console.log(result);
        console.log('fuck');
        if (result[0] === undefined) {
            message = {
                code: 0,
                user_role: null,
                message: '登陆失败',
                username: null
            }
            res.json(message);
        } else {
            message = {
                    code: 1,
                    user_role: [result[0].user_name],
                    message: '登陆成功',
                    username: req.body.username
                }
                // req.session.user_id = username;
            res.json(message);
        }
    })
})


//视频添加
router.post('/admin/video/add', function(req, res) {
    var form = new multiparty.Form();
    console.log(form);
    form.parse(req, function(err, fields, files) {
        res.write('已上传');
        res.end(util.inspect({ fields: fields, files: files }));
    })
    return;
})

//视频删除操作
router.post('/admin/video/delete', function(req, res) {
    var client = db.connect();
    db.deleteVideoFun(client, req.body.videoId, function(err) {
        if (err) {
            console.log("删除失败");
        } else {
            var message = {
                code: 1,
                message: '删除成功'
            }
            res.json(message);
        }
    });
})

// //视频查找一条操作
// router.post('/admin/video/find', function(req, res){
//     if(req.cookie){

//     }
//     else{
//         res.json({})
//     }
// })

module.exports = router;