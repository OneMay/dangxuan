var express = require('express');
var router = express.Router();
var fs = require('fs');
var db = require('../mysql/connect')
var multiparty = require('multiparty');
var path = require('path');
var Path = '../../dist/index.html';
var fiter = require('../filter/filter');

const path_dev = path.join(path.resolve(__dirname, '..'), 'media')

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
    console.log(req.body);
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
            var message = {
                code: 0,
                message: '删除失败'
            }
        }
        else{
            var message = {
                code: 1,
                message: '删除成功'
            }
            res.json(message);
        }
    });
})

//视频查找一条操作
router.post('/admin/video/find', function(req, res){
        var client = db.connect();
        var num = 5; //一页最多显示的条数
        var page = 1; //当前页
        var num_end = page*num; //结束查询位置
        var num_start = (page-1)*num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_television_program_content` WHERE video_introduction LIKE '%"+req.body.videoName+"%' limit "+num_start+","+num_end+" ";
        
        //计算数据总数
        db.findTo(client, function(result){
            count = result.length;
        })
        //返回查询的内容
        db.findFun(client, req.body.videoName, str, function(result){
            if(result[0]){
                message.code = 1;
                message.limit = num;
                message.count = count;
                message.videoList = new Array;
                for(var i=0; i<result.length; i++){
                    message.videoList.push({
                        videoName: result[i].video_introduction,
                        videoCategory: result[i].television_program_id,
                        videoUrl: result[i].video_url,
                        video_timestamp: result[i].video_timestamp,
                        note: result[i].note
                    })
                }
            }
        })

})

//视频全部查询
router.post('/admin/video/findAll', function(req, res){
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    if(req.body.page){
        current_page = parseInt(req.body.page);
    }
    var nun = (current_page-1)*num;
    var str = "SELECT * FROM `t_television_program_content` limit "+num+" offset "+nun+" ";
    db.findAll(client, str, function(result){
        if(result){
            message.code = 1;
            message.count = result.length;
            message.page = (result.length)%5+1;
            message.videoList = new Array();
            for(var i=0;i<result.length;i++){
                message.videoList.push({
                    videoName: result[i].video_introduction,
                    video_timestamp: result[i].video_timestamp,
                    note: result[i].note
                })
            }
            message.message = '操作成功';
        }
        else{
            message.code = 0;
        }
        res.json(message);
    })
})

//视频预览
router.post('/admin/video/preview', function(req, res){
    var str = "SELECT * FROM `t_television_program_content` WHERE video_introduction = "+req.body.videoName+" ";
    var client = db.connect();
    var message = {};
    db.findFun(client, str, function(result){
        if(result){
            message.code = 1;
            message.video_url = new Array();
            for(var i=0;i<result.length;i++){
                message.video_url.push(result[i].video_url);
            }
            message.message = '操作成功';
        }
        else{
            message.code = 0;
            message.message = '操作失败';
        }
    })
    res.json(message);
})


//视频修改
router.post('/admin/video/amend', function(req, res){
    var client = db.connect();
    
})


//-------微众杂志--------

//添加期数
router.post('/admin/magazine/addPeriods', function(req, res){
    var client = db.connect();
    db.addPeriod(client, req.body.magazine_journal_no, req.body.magazine_journal_title, path_dev, req.body.note, function(){

    })
})

//查询单个期数
router.post('/admin/magazine/findPeriods', function(req, res){
    var client = db.connect();
    
})





module.exports = router;