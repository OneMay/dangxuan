var express = require('express');
var router = express.Router();
var db = require('../mysql/connect')
var common = require('../mysql/common')
var path = require('path');
var Path = '../../dist/index.html';
var moment = require('moment');
var fiter = require('../filter/filter');

//登陆
router.post('/admin/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var client = db.connect();
    var result = null;
    var message = {};
    db.select(client, username, password, function(result) {
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

//-------------视频操作--------------------

//视频添加
router.post('/admin/video/add', function(req, res) {
    var showUrl = common.upload(req);
    var client = db.connect();
    db.insertVideoFun(client, req.body.videoId, req.body.videoName, showUrl, req.body.title, moment.format(), req.body.note);
    res.json({
        code: 1,
        message: '成功'
    })
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
        } else {
            var message = {
                code: 1,
                message: '删除成功'
            }
            res.json(message);
        }
    });
})

//视频查找一条操作
router.post('/admin/video/find', function(req, res) {
    var client = db.connect();
    var num = 5; //一页最多显示的条数
    var page = 1; //当前页
    var num_end = page * num; //结束查询位置
    var num_start = (page - 1) * num; //开始查询位置
    var message = {};
    var count = 0;
    

    //计算数据总数
    db.findTo(client, function(result) {
            count = result.length;
        })
    //返回查询的内容
    db.findFun(client, req.body.videoName, str, function(result) {
        if (result[0]) {
            message.code = 1;
            message.limit = num;
            message.count = count;
            message.videoList = new Array;
            for (var i = 0; i < result.length; i++) {
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
router.post('/admin/video/findAll', function(req, res) {
    var client = db.connect();
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    var count;
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }
    var nun = (current_page - 1) * num;
    var str = "SELECT * FROM `t_television_program_content` limit " + num + " offset " + nun + " ;";

    //无模糊查询
    if(!req.body.videoName){
        console.log('fc');
        db.findAllFun(client, function(result) {
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            console.log(result);
            if (result) {
                message.code = 1;
                message.count = count;
                message.limit = num;
                message.page = req.body.page;
                message.currentPage = count % 5 + 1;
                message.videoList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.videoList.push({
                        videoName: result[i].video_introduction,
                        video_timestamp: result[i].video_timestamp,
                        note: result[i].note
                    })
                }
                message.message = '操作成功';
            } else {
                message.code = 0;
            }
            res.json(message);
        })
    }

    //存在模糊查询
    else{
        console.log('fn');
        var num = 5; //一页最多显示的条数
        var page = req.body.page; //当前页
        var num_end = page * num; //结束查询位置
        var num_start = (page - 1) * num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_television_program_content` WHERE video_introduction LIKE '%" + req.body.videoName + "%' limit " + num_start + "," + num_end + " ";
        console.log(str);
        db.findTo(client, req.body.videoName, function(result) {
            console.log(result);
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            if (result[0]) {
                message.code = 1;
                message.limit = num;
                message.count = count;
                message.videoList = new Array;
                for (var i = 0; i < result.length; i++) {
                    message.videoList.push({
                        videoName: result[i].video_introduction,
                        videoCategory: result[i].television_program_id,
                        videoUrl: result[i].video_url,
                        video_timestamp: result[i].video_timestamp,
                        note: result[i].note
                    })
                }
                res.json(message);
            }
            else{
                res.json({code: 0, message: '操作失败'})
            }
        })
    }
})

//视频预览
router.post('/admin/video/preview', function(req, res) {
    var str = "SELECT * FROM `t_television_program_content` WHERE video_introduction = " + req.body.videoName + " ";
    var client = db.connect();
    var message = {};
    db.findFun(client, str, function(result) {
        if (result) {
            message.code = 1;
            message.video_url = new Array();
            for (var i = 0; i < result.length; i++) {
                message.video_url.push(result[i].video_url);
            }
            message.message = '操作成功';
        } else {
            message.code = 0;
            message.message = '操作失败';
        }
    })
    res.json(message);
})


//视频修改
router.post('/admin/video/amend', function(req, res) {
    var client = db.connect();
})


//-------微众杂志--------

//添加期数
router.post('/admin/magazine/addPeriods', function(req, res) {
    var showUrl = common.upload(req);
    var client = db.connect();
    db.addPeriod(client, req.body.magazine_journal_no, req.body.magazine_journal_title, showUrl, req.body.note, function() {
        res.json({ code: 1, message: '操作成功' })
    });
})

//查询单个期数
router.post('/admin/magazine/findPeriods', function(req, res) {


    var client = db.connect();
    db.findM(client, req.body.magazine_journal_no, function(result) {
        if (!result) {
            res.json({ code: 0, message: '查询失败' })
            return;
        }
        var message = {};
        message.code = 1;
        message.magazine_journal_no = result.magazine_journal_no;
        message.magazine_journal_title = result.magazine_journal_title;
        message.magazine_journal_timestamp = result.magazine_journal_timestamp;
        message.magazine_program_id = result.magazine_program_id;
        message.note = result.note;
        message.message = '操作成功';
        res.json(message);
    })

})

//查询全部期数
router.get('/admin/magazine/findAllPeriods', function(req, res) {
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }
    var nun = (current_page - 1) * num;
    var str = "SELECT * FROM `t_magazine_program` limit " + num + " offset " + nun + " ";
    db.findAll(client, str, function(result) {
        if (result) {
            var message = {};
            message.code = 1;
            message.limit = 5;
            message.count = result.length;
            message.page = (result.length) % 5 + 1;
            message.megazineList = new Array();
            for (var i = 0; i < result.length; i++) {
                message.megazineList.push({
                    magazine_journal_no: result[i].magazine_journal_no,
                    magazine_journal_title: result[i].magazine_journal_title,
                    magazine_journal_timestamp: moment.format(),
                    magazine_program_id: result[i].magazine_program_id,
                    note: result[i].note
                })
            }
            message.message = '操作成功';
            res.json(message);
        }
    })
})

//期数删除
router.post('/admin/magazine/delPeriods', function(req, res) {
    var client = db.connect();
    db.deleteM(client, req.body.magazine_journal_no);
})


//文章添加
router.post('/admin/magazine/addArticle', function(req, res) {})


//--------------广播台----------------

//栏目添加
router.post('/admin/radio/columnAdd', function(req, res) {
    var client = db.connect();
    db.addC(client, req.body.program_name, req.body.program_date, function() {
        res.json({
            code: 1,
            message: '操作成功'
        })
    })
})

//栏目查询
router.post('/admin/radio/columnFind', function(req, res) {
    var client = db.connect();
    var num = 5; //一页最多显示的条数
    var page = 1; //当前页
    var num_end = page * num; //结束查询位置
    var num_start = (page - 1) * num; //开始查询位置
    var message = {};
    var count = 0;
    var str = "select * from `t_radio_program` WHERE program_name LIKE '%" + req.body.program_name + "%' limit " + num_start + "," + num_end + " ";
    db.findL(client, function(result) {
        count = result.length;
    })

    db.findFun(client, str, function(result) {
        if (result) {
            message.code = 1;
            message.count = count;
            message.message = '操作成功';
        } else {
            message.code = 0;
            message.message = '操作失败';
        }
    })
})

//栏目修改
router.post('/admin/radio/columnAmend', function(req, res) {
    var client = db.connect();
    db.updateL(client, req.body.program_id, req.body.program_name, req.body.program_date, function() {
        res.json({ code: 1, message: '操作成功' })
    })
})

//栏目删除
router.post('/admin/radio/columnDel', function(req, res) {
    var client = db.connect();
    db.deleteL(client, req.body.program_name, req.body.program_date, function() {
        res.json({
            code: 1,
            message: '操作成功'
        })
    })
})

//首页轮播添加
router.post('/admin/radio/carouselAdd', function(req, res) {
    var showUrl = common.upload(req);
    var client = db.connect();
    db.addP(client, showUrl, function() {
        res.json({
            code: 1,
            message: '操作成功'
        })
    })
})

//广播添加
router.post('/admin/radio/Add', function(req, res) {
    var showUrl = common.upload(req);
    var client = db.connect();
    db.addV(client, showUrl, url, req.body.program_introduction, function() {
        res.json({
            code: 1,
            message: '操作成功'
        })
    })
})

//广播查询
router.post('/admin/radio/Find', function(req, res) {
    var client = db.connect();

})


//-----------反馈栏目管理------------
router.post('/admin/feedback/findAll', function(req, res) {
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }
    var nun = (current_page - 1) * num;
    var str = "SELECT * FROM `feedbackinfo` limit " + num + " offset " + nun + " ";
    db.findAll(client, str, function(result) {
        if (result) {
            var message = {};
            message.code = 1;
            message.limit = 5;
            message.count = result.length;
            message.page = (result.length) % 5 + 1;
            message.feedbackList = new Array();
            for (var i = 0; i < result.length; i++) {
                message.feedbackList.push({
                    FeedbackTitle: result[i].FeedbackTitle,
                    Feedback_timestamp: result[i].Feedback_timestamp,
                    UserName: result[i].UserName,
                    Feedback_state: result[i].Feedback_state,
                    id: result[i].id
                })
            }
            message.message = '操作成功';
            res.json(message);
        }
    })
})


//单个反馈查询
router.post('/admin/feedback/detail', function(req, res) {
    var client = db.connect();
    db.feedback(client, req.body.id, function(result) {
        res.json({
            code: 1,
            feedbackList: [{
                FeedbackTitle: result.FeedbackTitle,
                FeedbackContent: result.FeedbackContent
            }],
            message: '操作成功'
        })
    })
})

module.exports = router;