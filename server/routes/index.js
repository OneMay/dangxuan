var express = require('express');
var router = express.Router();
var db = require('../mysql/connect')
var common = require('../mysql/common')
var path = require('path');
var Path = '../../dist/index.html';
var moment = require('moment');
var fiter = require('../filter/filter');


// router.post('/**', function(req, res, next){
//     console.log('sasdasdsadasd');
//     console.log(req.session.user);
//     if(!req.session.user){
//         req.flash('error', '未登陆');
//         res.redirect('/admin/login');
//         console.log('sadas');
//     }
//     next();
// })
//时间格式化
Date.prototype.Format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份         
            "d+": this.getDate(), //日         
            "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
            "H+": this.getHours(), //小时         
            "m+": this.getMinutes(), //分         
            "s+": this.getSeconds(), //秒         
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度         
            "S": this.getMilliseconds() //毫秒         
        };
        var week = {
            "0": "/u65e5",
            "1": "/u4e00",
            "2": "/u4e8c",
            "3": "/u4e09",
            "4": "/u56db",
            "5": "/u4e94",
            "6": "/u516d"
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    }
    //登陆
router.post('/admin/login', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    var client = db.connect();
    var result = null;
    var message = {};
    db.selectFun(client, username, password, function(result) {
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
            req.session.user_id = username;
            res.json(message);
        }
    })
})

//-------------视频操作--------------------

//视频添加
router.post('/admin/video/add', function(req, res) {
    common.upload(req, function(fields, showUrl, showUrl_1) {
        var client = db.connect();
        db.insertVideoFun(client, fields.videoId, showUrl, showUrl_1, fields.videoTitle, moment().format('YYYY-MM-DD HH:mm:ss'), fields.note);
        res.json({
            code: 1,
            message: '成功'
        })
    });
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
    var message = {};
    //返回查询的内容
    db.findO(client, req.body.television_program_content_id, function(result) {
        if (result[0]) {
            message.code = 1;
            message.videoList = new Array;
            for (var i = 0; i < result.length; i++) {
                message.videoList.push({
                    videoName: result[i].video_introduction,
                    videoCategory: result[i].television_program_id,
                    videoUrl: result[i].video_url,
                    video_timestamp: new Date(result[i].video_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                    television_program_content_id: result[i].television_program_content_id,
                    note: result[i].note
                })
            }
        }
        res.json(message);
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
    var str = "SELECT * FROM `t_television_program_content` order by video_timestamp desc limit " + num + " offset " + nun + " ;";

    //无模糊查询
    if (!req.body.videoName) {
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
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.videoList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.videoList.push({
                        videoName: result[i].video_introduction,
                        video_timestamp: new Date(result[i].video_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        television_program_content_id: result[i].television_program_content_id,
                        television_program_id: result[i].television_program_id,
                        note: result[i].note || 'admin'
                    })
                }

                message.videoList.forEach(function(value, index, array) {
                    array[index].videoCategory = db.findC(client, array[index].television_program_id, function(result) {
                        array[index].videoCategory = result[0].television_title;
                        if (message.videoList.length == index + 1) {
                            message.message = '操作成功';
                            return res.json(message);
                        }
                    });
                });
            } else {
                res.json({ code: 1, message: '操作失败', videoList: null })
            }
        })
    }

    //存在模糊查询
    else {
        console.log('fn');
        var num = 5; //一页最多显示的条数
        var page = req.body.page; //当前页
        var num_end = page * num; //结束查询位置
        var num_start = (page - 1) * num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_television_program_content` WHERE video_introduction LIKE '%" + req.body.videoName + "%' order by video_timestamp desc limit " + num_start + "," + num_end + " ";
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
                message.page = page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.videoList = new Array;
                for (var i = 0; i < result.length; i++) {
                    message.videoList.push({
                        videoName: result[i].video_introduction,
                        videoUrl: result[i].video_url,
                        video_timestamp: new Date(result[i].video_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        television_program_content_id: result[i].television_program_content_id,
                        television_program_id: result[i].television_program_id,
                        note: result[i].note || 'admin'
                    })
                }
                message.videoList.forEach(function(value, index, array) {
                    array[index].videoCategory = db.findC(client, array[index].television_program_id, function(result) {
                        array[index].videoCategory = result[0].television_title;
                        if (message.videoList.length == index + 1) {
                            message.message = '操作成功';
                            return res.json(message);
                        }
                    });
                });
            } else {
                res.json({ code: 1, message: '操作失败', videoList: null })
            }
        })
    }
})

//视频预览
router.post('/admin/video/preview', function(req, res) {
    var str = "SELECT * FROM `t_television_program_content` WHERE television_program_content_id = " + req.body.videoId + " ";
    var client = db.connect();
    var message = {};
    db.findFun(client, str, function(result) {
        if (result) {
            console.log(result[0].video_url);
            message.code = 1;
            message.video_url = result[0].video_url;
            message.message = '操作成功';
        } else {
            message.code = 0;
            message.message = '操作失败';
        }
        res.json(message);
    })
})


//视频修改
router.post('/admin/video/amend', function(req, res) {
    common.upload(req, function(fields, showUrl, showUrl_1) {
        var client = db.connect();

        db.update(client, fields.videoId, fields.television_program_content_id, showUrl, showUrl_1, fields.videoTitle, moment().format('YYYY-MM-DD HH:mm:ss'), fields.note);
        res.json({
            code: 1,
            message: '更新成功！'
        })
    });
});

//-------微众杂志--------

//添加期数
router.post('/admin/magazine/addPeriods', function(req, res) {
    common.upload_2(req, function(fields, showUrl) {
        var client = db.connect();
        db.addPeriod(client, fields.magazine_journal_no, fields.magazine_journal_title, showUrl, moment().format('YYYY-MM-DD HH:mm:ss'), " ", function() {
            res.json({ code: 1, message: '操作成功' })
        });
    })
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
        message.magazine_journal_no = result[0].magazine_journal_no;
        message.magazine_journal_title = result[0].magazine_journal_title;
        message.magazine_journal_timestamp = new Date(result[0].magazine_journal_timestamp).Format("yyyy-MM-dd HH:mm:ss");
        message.magazine_program_id = result[0].magazine_program_id;
        message.note = result[0].note;
        message.message = '操作成功';
        res.json(message);
    })

})

//查询全部期数
router.post('/admin/magazine/findAllPeriods', function(req, res) {
    var client = db.connect();
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    var count;
    var megazinePeriods = new Array();
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }
    // db.findY(client, function(result) {
    //         result.forEach(function(value, index) {
    //             message.megazinePeriods.push(value.magazine_journal_no)
    //         })
    //         console.log(message.megazinePeriods)
    //     })
    //没有关键字查询
    if (!req.body.magazine_journal_no) {
        var nun = (current_page - 1) * num;
        var str = "SELECT * FROM `t_magazine_program` order by magazine_journal_timestamp desc limit " + num + " offset " + nun + " ";
        db.findY(client, function(result) {
            count = result.length;
            result.forEach(function(value, index) {
                megazinePeriods.push(value.magazine_journal_no)
            })
        })
        db.findFun(client, str, function(result) {
            if (result) {
                var message = {};
                message.code = 1;
                message.limit = 5;
                message.count = count;
                message.megazinePeriods = megazinePeriods;
                message.page = req.body.page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.megazineList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.megazineList.push({
                        magazine_journal_no: result[i].magazine_journal_no,
                        magazine_journal_title: result[i].magazine_journal_title,
                        magazine_journal_timestamp: new Date(result[i].magazine_journal_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        magazine_program_id: result[i].magazine_program_id,
                        note: result[i].note
                    })
                }
                message.message = '操作成功';
                res.json(message);
            } else {
                res.json({ code: 1, megazineList: null });
            }
        })
    }

    //模糊查询
    else {
        console.log('kk');
        var num = 5; //一页最多显示的条数
        var page = req.body.page; //当前页
        var num_end = page * num; //结束查询位置
        var num_start = (page - 1) * num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_magazine_program` WHERE magazine_journal_no LIKE '%" + req.body.magazine_journal_no + "%' order by magazine_journal_timestamp desc limit " + num_start + "," + num_end + " ";
        db.findMA(client, req.body.magazine_journal_no, function(result) {
            console.log(result);
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            if (result[0]) {
                message.code = 1;
                message.limit = num;
                message.count = count;
                message.page = req.body.page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.megazineList = new Array;
                for (var i = 0; i < result.length; i++) {
                    message.megazineList.push({
                        magazine_journal_no: result[i].magazine_journal_no,
                        magazine_journal_title: result[i].magazine_journal_title,
                        magazine_journal_timestamp: new Date(result[i].magazine_journal_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        magazine_program_id: result[i].magazine_program_id,
                        note: result[i].note
                    })
                }
                res.json(message);
            } else {
                res.json({ code: 1, megazineList: null })
            }
        })
    }
})

//期数删除
router.post('/admin/magazine/delPeriods', function(req, res) {
    var client = db.connect();
    db.deleteM(client, req.body.magazine_program_id, function() {
        res.json({
            message: '操作成功',
            code: 1
        })
    });
})

//期数修改
router.post('/admin/magazine/amend', function(req, res) {
    common.upload_2(req, function(fields, showUrl) {
        var client = db.connect();
        db.updateP(client, fields.magazine_journal_no, fields.magazine_journal_title, showUrl, " ", fields.magazine_program_id, moment().format('YYYY-MM-DD HH:mm:ss'), function() {
            res.json({ code: 1, message: '修改成功' })
        });
    })

})

//文章添加
router.post('/admin/magazine/addArticle', function(req, res) {
    var client = db.connect();
    var list_writer = 'admin';
    db.findM(client, req.body.magazine_journal_no, function(result) {
        if (!result) {
            res.json({ code: 0, message: '查询失败' })
            return;
        }
        var magazine_program_id = result[0].magazine_program_id;
        console.log(magazine_program_id)
        db.addA(client, magazine_program_id, req.body.list_title, req.body.list_content, list_writer, moment().format('YYYY-MM-DD HH:mm:ss'), function() {
            res.json({
                code: 1,
                message: '操作成功'
            })
        })
    })
})

//查找所有文章
router.post('/admin/magazine/findAllArticle', function(req, res) {
    var client = db.connect();
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    var count;
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }

    //没有关键字查询
    if (!req.body.list_title) {
        var nun = (current_page - 1) * num;
        var str = "SELECT * FROM `t_magazine_list`  order by insert_time desc limit " + num + " offset " + nun + " ";
        db.findAA(client, function(result) {
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            if (result) {
                var message = {};
                message.code = 1;
                message.limit = 5;
                message.count = count;
                message.page = req.body.page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.articleList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.articleList.push({
                        list_title: result[i].list_title,
                        insert_time: new Date(result[i].insert_time).Format("yyyy-MM-dd HH:mm:ss"),
                        list_writer: result[i].list_writer,
                        magazine_list_id: result[i].magazine_list_id,
                        magazine_program_id: result[i].magazine_program_id
                    })
                }
                console.log('fuck ass');
                message.articleList.forEach(function(value, index, array) {
                    array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id, function(result) {
                        array[index].magazine_journal_no = result[0].magazine_journal_no;
                        if (message.articleList.length == index + 1) {
                            message.message = '操作成功';
                            return res.json(message);
                        }
                    });
                });
            } else {
                res.json({ code: 1, megazineList: null });
            }
        })
    }

    //模糊查询
    else {
        console.log('kk');
        var num = 5; //一页最多显示的条数
        var page = req.body.page; //当前页
        var num_end = page * num; //结束查询位置
        var num_start = (page - 1) * num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_magazine_list` WHERE list_title LIKE '%" + req.body.list_title + "%' order by insert_time desc limit " + num_start + "," + num_end + " ";
        db.findAllA(client, req.body.list_title, function(result) {
            console.log(result);
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            if (result[0]) {
                message.code = 1;
                message.limit = num;
                message.count = count;
                message.page = req.body.page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.articleList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.articleList.push({
                        list_title: result[i].list_title,
                        insert_time: new Date(result[i].insert_time).Format("yyyy-MM-dd HH:mm:ss"),
                        list_writer: result[i].list_writer,
                        magazine_list_id: result[i].magazine_list_id,
                        magazine_program_id: result[i].magazine_program_id
                    })
                }
                message.articleList.forEach(function(value, index, array) {
                    array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id, function(result) {
                        array[index].magazine_journal_no = result[0].magazine_journal_no;
                        if (message.articleList.length == index + 1) {
                            message.message = '操作成功';
                            return res.json(message);
                        }
                    });
                });
            } else {
                res.json({ code: 1, megazineList: null })
            }
        })
    }
})

//查询单个文章
router.post('/admin/magazine/findArticle', function(req, res) {
    var str = "SELECT * FROM `t_magazine_list` WHERE magazine_list_id = " + req.body.magazine_list_id + " ";
    var client = db.connect();
    var message = {};
    db.findFun(client, str, function(result) {
        if (result) {
            message.articleList = new Array;
            for (var i = 0; i < result.length; i++) {
                message.articleList.push({
                    magazine_journal_no: result[i].magazine_journal_no,
                    list_title: result[i].list_title,
                    insert_time: new Date(result[i].insert_time).Format("yyyy-MM-dd HH:mm:ss"),
                    list_writer: result[i].list_writer,
                    list_content: result[i].list_content,
                    magazine_list_id: result[i].magazine_list_id,
                    magazine_program_id: result[i].magazine_program_id
                })
            }
            message.articleList.forEach(function(value, index, array) {
                array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id, function(result) {
                    array[index].magazine_journal_no = result[0].magazine_journal_no;
                    if (message.articleList.length == index + 1) {
                        message.code = 1;
                        message.message = '操作成功';
                        return res.json(message);
                    }
                });
            });
        } else {
            message.code = 0;
            message.message = '操作失败';
            res.json(message);
        }

    })

})

//文章预览
router.post('/admin/magazine/previewArticle', function(req, res) {
    var str = "SELECT * FROM `t_magazine_list` WHERE magazine_list_id = " + req.body.magazine_list_id + " ";
    var client = db.connect();
    var message = {};
    db.findFun(client, str, function(result) {
        if (result) {
            message.articleList = new Array;
            for (var i = 0; i < result.length; i++) {
                message.articleList.push({
                    magazine_journal_no: result[i].magazine_journal_no,
                    list_title: result[i].list_title,
                    insert_time: new Date(result[i].insert_time).Format("yyyy-MM-dd HH:mm:ss"),
                    list_writer: result[i].list_writer,
                    list_content: result[i].list_content,
                    magazine_program_id: result[i].magazine_program_id
                })
            }
            message.articleList.forEach(function(value, index, array) {
                array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id, function(result) {
                    array[index].magazine_journal_no = result[0].magazine_journal_no;
                    if (message.articleList.length == index + 1) {
                        message.code = 1;
                        message.message = '操作成功';
                        return res.json(message);
                    }
                });
            });
        } else {
            message.code = 0;
            message.message = '操作失败';
            res.json(message);
        }
    })

})


//文章删除
router.post('/admin/magazine/delArticle', function(req, res) {
        var client = db.connect();
        db.delA(client, req.body.magazine_list_id, function() {
            res.json({
                message: '操作成功',
                code: 1
            })
        });
    })
    //文章修改
router.post('/admin/magazine/amendArticle', function(req, res) {
    var client = db.connect();
    var list_writer = 'admin';
    db.findM(client, req.body.magazine_journal_no, function(result) {
        if (!result) {
            res.json({ code: 0, message: '查询失败' })
            return;
        }
        var magazine_program_id = result[0].magazine_program_id;
        console.log(magazine_program_id)
        db.updateA(client, magazine_program_id, req.body.magazine_list_id, req.body.list_title, req.body.list_content, list_writer, moment().format('YYYY-MM-DD HH:mm:ss'), function() {
            res.json({
                code: 1,
                message: '操作成功'
            })
        })
    })

})

//--------------广播台----------------

//栏目添加
router.post('/admin/radio/columnAdd', function(req, res) {
    common.upload_3(req, function(fields, showUrl) {
        var client = db.connect();

        db.addC(client, fields.program_name, fields.program_date, fields.program_timestamp, showUrl);
        res.json({
            code: 1,
            message: '更新成功！'
        })
    });
})

//单个栏目查询
router.post('/admin/radio/columnFind', function(req, res) {
        var client = db.connect();
        //没有关键字查询

        var str = "SELECT * FROM `t_radio_program` WHERE program_id = " + req.body.program_id + " ";
        db.findFun(client, str, function(result) {
            if (result) {
                var message = {};
                message.code = 1;
                message.columnList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.columnList.push({
                        program_name: result[i].program_name,
                        program_number: result[i].program_number,
                        program_date: result[i].program_date,
                        program_timestamp: new Date(result[i].program_timestamp).Format("yyyy-MM-dd"),
                        program_id: result[i].program_id
                    })
                }
                console.log('fuck ass');
                //  message.articleList.forEach(function(value, index, array) {
                //      array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id);
                //      // console.log(db.findQ(client, array[index].magazine_program_id));
                //  });
                message.message = '操作成功';
                res.json(message);
            } else {
                res.json({ code: 0 });
            }
        })


    })
    //栏目查询
router.post('/admin/radio/columnFindAll', function(req, res) {
    var client = db.connect();
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    var column_program_name = [];
    var count;
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }

    //没有关键字查询
    if (!req.body.program_name) {
        var nun = (current_page - 1) * num;
        var str = "SELECT * FROM `t_radio_program` order by program_timestamp desc limit " + num + " offset " + nun + " ";
        db.findAL(client, function(result) {
            count = result.length;
        })
        client.query("SELECT distinct program_name FROM `t_radio_program`", function(err, result) {
            if (err) throw err;
            result.forEach(function(value, index) {
                column_program_name.push(value.program_name);
            })
        })
        db.findFun(client, str, function(result) {
            if (result) {
                console.log(result)
                var message = {};
                message.code = 1;
                message.limit = 5;
                message.count = count;
                message.page = req.body.page;
                message.column_program_name = column_program_name;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.columnList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.columnList.push({
                        program_name: result[i].program_name,
                        program_number: result[i].program_number,
                        program_date: result[i].program_date,
                        program_timestamp: new Date(result[i].program_timestamp).Format("yyyy-MM-dd"),
                        program_id: result[i].program_id
                    })
                }
                console.log('fuck ass');
                //  message.articleList.forEach(function(value, index, array) {
                //      array[index].magazine_journal_no = db.findQ(client, array[index].magazine_program_id);
                //      // console.log(db.findQ(client, array[index].magazine_program_id));
                //  });
                message.message = '操作成功';
                res.json(message);
            } else {
                res.json({ code: 0 });
            }
        })
    }

    //模糊查询
    else {
        console.log('kk');
        var num = 5; //一页最多显示的条数
        var page = req.body.page; //当前页
        var num_end = page * num; //结束查询位置
        var num_start = (page - 1) * num; //开始查询位置
        var message = {};
        var count = 0;
        var str = "select * from `t_radio_program` WHERE program_name LIKE '%" + req.body.program_name + "%' order by program_timestamp desc limit " + num_start + "," + num_end + " ";
        db.findL(client, req.body.program_name, function(result) {
            count = result.length;
        })
        db.findFun(client, str, function(result) {
            if (result[0]) {
                message.code = 1;
                message.limit = num;
                message.count = count;
                message.page = req.body.page;
                message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                message.columnList = new Array;
                for (var i = 0; i < result.length; i++) {
                    message.columnList.push({
                        program_name: result[i].program_name,
                        program_number: result[i].program_number,
                        program_date: result[i].program_date,
                        program_timestamp: new Date(result[i].program_timestamp).Format("yyyy-MM-dd"),
                        program_id: result[i].program_id
                    })
                }
                res.json(message);
            } else {
                res.json({ code: 1, columnList: [] })
            }
        })
    }
})

//栏目修改
router.post('/admin/radio/columnAmend', function(req, res) {
        common.upload_3(req, function(fields, showUrl) {
            var client = db.connect();
            db.updateL(client, fields.program_id, fields.program_name, fields.program_date, fields.program_timestamp, showUrl);
            res.json({
                code: 1,
                message: '更新成功！'
            })
        });
    })
    //栏目删除
router.post('/admin/radio/columnDel', function(req, res) {
    var client = db.connect();
    db.deleteL(client, req.body.program_id, function() {
        res.json({
            code: 1,
            message: '操作成功'
        })
    })
})


//广播添加
router.post('/admin/radio/Add', function(req, res) {
        common.upload_4(req, function(fields, showUrl, showUrl1) {
            var client = db.connect();
            var str = "SELECT * FROM `t_radio_program` WHERE  program_name = '" + fields.program_name + "'and program_date = '" + fields.program_date + "' ";
            console.log(str)
            client.query(str, function(err, result) {
                if (err) throw err;
                console.log(result);
                if (result[0]) {
                    db.addV(client, showUrl, showUrl1, fields.program_introduction, moment().format('YYYY-MM-DD HH:mm:ss'), result[0].program_id);
                    res.json({
                        code: 1,
                        message: '上传成功！'
                    })
                } else {
                    res.json({
                        code: 0,
                        message: '上传失败，请注意输入内容是否正确。'
                    })
                }
            })
        });
    })
    //广播修改
router.post('/admin/radio/Amend', function(req, res) {
        common.upload_4(req, function(fields, showUrl, showUrl1) {
            var client = db.connect();
            var str = "SELECT * FROM `t_radio_program` WHERE  program_name = '" + fields.program_name + "'and program_date = '" + fields.program_date + "' ";
            client.query(str, function(err, result) {
                if (err) throw err;
                console.log(result);
                if (result[0]) {
                    db.updateV(client, showUrl, showUrl1, fields.program_introduction, moment().format('YYYY-MM-DD HH:mm:ss'), result[0].program_id, fields.program_content_id);
                    res.json({
                        code: 1,
                        message: '上传成功！'
                    })
                } else {
                    res.json({
                        code: 0,
                        message: '上传失败，请注意输入内容是否正确。'
                    })
                }
            })
        });
    })
    //单个广播查询
router.post('/admin/radio/Find', function(req, res) {
        var client = db.connect();
        //没有关键字查询

        var str = "SELECT * FROM `t_radio_content` WHERE program_content_id = " + req.body.program_content_id + " ";
        db.findFun(client, str, function(result) {
            if (result) {
                var message = {};
                message.code = 1;
                message.radioList = new Array();
                for (var i = 0; i < result.length; i++) {
                    message.radioList.push({
                        program_audio_timestamp: new Date(result[i].audio_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        program_content_id: result[i].program_content_id,
                        program_introduction: result[i].program_introduction,
                        program_audio_timestamp: new Date(result[i].program_audio_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                        program_id: result[i].program_id,
                    })
                }

                message.radioList.forEach(function(value, index, array) {
                    db.findAQ(client, array[index].program_id, function(result) {
                        if (result[0]) {
                            array[index].program_timestamp = new Date(result[0].program_timestamp).Format("yyyy-MM-dd") || '';
                            array[index].program_name = result[0].program_name || '';
                            array[index].program_date = result[0].program_date || '';
                        }
                        if (message.radioList.length == index + 1) {
                            message.code = 1;
                            message.message = '操作成功';
                            return res.json(message);
                        }
                    });
                });
            } else {
                res.json({ code: 0 });
            }
        })


    })
    //广播查询
router.post('/admin/radio/FindAll', function(req, res) {
        var client = db.connect();
        var current_page = 1; //当前页面
        var num = 5;
        var message = {};
        var count;
        if (req.body.page) {
            current_page = parseInt(req.body.page);
        }

        //没有关键字查询
        if (!req.body.program_name) {
            var nun = (current_page - 1) * num;
            var str = "SELECT * FROM `t_radio_content` order by program_audio_timestamp desc limit " + num + " offset " + nun + " ";
            console.log(str);
            db.findV(client, function(result) {
                count = result.length;
                console.log(count)
            })

            db.findFun(client, str, function(result) {
                console.log('sadsadasdasdasdasd');
                if (result) {
                    var message = {};
                    message.code = 1;
                    message.limit = 5;
                    message.count = count;
                    message.page = req.body.page;
                    message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                    message.radioList = new Array();
                    for (var i = 0; i < result.length; i++) {
                        message.radioList.push({
                            program_audio_timestamp: new Date(result[i].program_audio_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                            program_content_id: result[i].program_content_id,
                            program_introduction: result[i].program_introduction,
                            program_id: result[i].program_id,
                        })
                    }

                    message.radioList.forEach(function(value, index, array) {
                        db.findAQ(client, array[index].program_id, function(result) {
                            if (result[0]) {
                                array[index].program_name = result[0].program_name || '';
                                array[index].program_date = result[0].program_date || '';
                            }
                            if (message.radioList.length == index + 1) {
                                message.code = 1;
                                message.message = '操作成功';
                                return res.json(message);
                            }
                        });
                    });
                } else {
                    res.json({ code: 0 });
                }
            })
        }

        //模糊查询
        else {
            console.log('kk');
            var num = 5; //一页最多显示的条数
            var page = req.body.page; //当前页
            var num_end = page * num; //结束查询位置
            var num_start = (page - 1) * num; //开始查询位置
            var message = {};
            var count = 0;
            var str = "select * from `t_radio_content` WHERE program_name LIKE '%" + req.body.program_name + "%'  limit " + num_start + "," + num_end + " ";
            db.findVL(client, req.body.program_name, function(result) {
                console.log(result);
                count = result.length;
            })
            db.findFun(client, str, function(result) {
                if (result[0]) {
                    message.code = 1;
                    message.limit = num;
                    message.count = count;
                    message.page = req.body.page;
                    message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
                    message.radioList = new Array;
                    for (var i = 0; i < result.length; i++) {
                        message.radioList.push({
                            program_content_id: result[i].program_content_id,
                            program_introduction: result[i].program_introduction,
                            program_audio_timestamp: new Date(result[i].program_audio_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                            program_id: result[i].program_id,
                        })
                    }

                    message.radioList.forEach(function(value, index, array) {
                        db.findAQ(client, array[index].program_id, function(result) {
                            if (result[0]) {
                                array[index].program_name = result[0].program_name || '';
                                array[index].program_date = result[0].program_date || '';
                            }
                            if (message.radioList.length == index + 1) {
                                message.code = 1;
                                message.message = '操作成功';
                                return res.json(message);
                            }
                        });
                    });
                } else {
                    res.json({ code: 0 })
                }
            })
        }
    })
    //广播删除
router.post('/admin/radio/del', function(req, res) {
        var client = db.connect();
        db.deleteAL(client, req.body.program_content_id, function() {
            res.json({
                code: 1,
                message: '操作成功'
            })
        })
    })
    //广播预览
router.post('/admin/radio/Preview', function(req, res) {
        var client = db.connect();

        var str = "SELECT * FROM `t_radio_content` WHERE program_content_id = " + req.body.program_content_id + " ";
        db.findFun(client, str, function(result) {
            if (result) {
                var message = {};
                message.code = 1;
                message.program_audio_url = result[0].program_audio_url;
                message.message = '操作成功';
                return res.json(message);
            } else {
                res.json({ code: 0 });
            }
        })

    })
    //-----------轮播添加----------------
router.post('/admin/radio/carouselAdd', function(req, res) {
    common.upload_5(req, function(fields, showUrl) {
        var client = db.connect();
        db.addP(client, showUrl, moment().format('YYYY-MM-DD HH:mm:ss'));
        res.json({
            code: 1,
            message: '上传成功！'
        })
    });
})

//-----------反馈栏目管理------------
router.post('/admin/feedback/findAll', function(req, res) {
    var client = db.connect();
    var current_page = 1; //当前页面
    var num = 5;
    var message = {};
    var count;
    if (req.body.page) {
        current_page = parseInt(req.body.page);
    }
    var nun = (current_page - 1) * num;
    console.log('se');
    db.findF(client, function(result) {
        count = result.length;
    })
    console.log('ss');
    var str = "SELECT * FROM `feedbackinfo` limit " + num + " offset " + nun + " ";
    db.findFun(client, str, function(result) {
        if (result) {
            var message = {};
            message.code = 1;
            message.limit = 5;
            message.count = count;
            message.page = req.body.page;
            message.currentPage = count % 5 ? parseInt(count / 5) + 1 : count / 5;
            message.feedbackList = new Array();
            for (var i = 0; i < result.length; i++) {
                message.feedbackList.push({
                    FeedbackTitle: result[i].FeedbackTitle,
                    Feedback_timestamp: new Date(result[i].feedback_timestamp).Format("yyyy-MM-dd HH:mm:ss"),
                    UserName: result[i].UserName,
                    Feedback_state: result[i].Feedback_state,
                    id: result[i].Id
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
                FeedbackTitle: result[0].FeedbackTitle,
                FeedbackContent: result[0].FeedbackContent
            }],
            message: '操作成功'
        })
    })
})

module.exports = router;