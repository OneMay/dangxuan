var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../mysql/connect')
var multiparty = require('multiparty');
var Path = '../../dist/index.html';
var fiter = require('../filter/filter');

//登陆
router.post('/admin/login', function(req, res, next){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;

    var client = db.connect();
    var result = null;
    var message = {};
    db.select(client, username, password, function(result){
        console.log(result);
        console.log('fuck');
        if(result[0] === undefined){
            message = {
                code: 0,
                user_role: null,
                message: '登陆失败',
                username: null
            }
            res.json(message);
        }
        else{
            message = {
                code: 1,
                user_role: result[0].user_name,
                message: '登陆成功',
                username: req.body.username
            }
            // req.session.user_id = username;
            res.json(message);
        }
    })
})


//视频添加
// router.post('/admin/video/add', function(req, res){
//     var form = new multiparty.Form();
//     var video_path = req.files.video.path;
//     var video_name = req.files.video.originalFilename;
    
//     fs.readFile(video_path, function(err, data){
//         if(!data || err){
//             return reply({code: 0, message: '视频上传失败，未选择文件'});
//          }
//         var newPath = path.join(__dirname, '../../', 'static/upload/' + video_name);
//         fs.writeFile(newPath, data, function(){
//             if(err){
//                 return reply({code: 0, message: "视频上传失败，写问题"})
//             }
//             else{
//                 return rely({code: 1, message: "视频上传成功"})
//                 var client = db.connect();
//                 db.insertVideoFun(client, req.body.videoId, )
//             }
//         })
//     })

// })

// //视频删除操作
// router.post('/admin/video/delete', function(req, res){
//     if(req.cookie){
//         var client = db.connect();
//         db.deleteVideoFun(client, req.body.videoName);
//     }
//     else{
//         res.json({code: 0, message: '身份验证失败'})
//     }
// })

// //视频查找一条操作
// router.post('/admin/video/find', function(req, res){
//     if(req.cookie){
        
//     }
//     else{
//         res.json({})
//     }
// })

module.exports = router;