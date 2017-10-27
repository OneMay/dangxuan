var mysql = require('mysql');
var config = require('../config/config.js')

function connectServer() {
    var client = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })

    return client;
}

//查找视频
function selectFun(client, username, password, callback) {
    client.query('select * from t_user where user_no="' + username + '" and password="' + password + '"', function(err, result, fields) {
        if (err) throw err;

        callback(result);
    })
}

//插入新的视频
function insertVideoFun(client, id, post_url, url, title, time, note, callback){
    client.query("INSERT INTO `t_television_program_content` (`television_program_id`, `thumbnails_url`, `video_url`, `video_introduction`, `video_introduction`, `video_timestamp`, `note`) VALUES ('"+id+"', '"+post_url+"', '"+url+"', '"+title+"', '"+time+"', '"+note+"')", function(err){
        if(err) throw err;
        callback(err);
    });
}

//删除视频
function deleteVideoFun(client, name, callback){
    client.query("DELETE FROM `t_television_program_content` WHERE (`television_program_content_id`='"+name+"')", function(err){
        if(err) throw err;
        callback(err);
    });
}

//查找视频总数
function findTo(client, name, callback) {
    client.query("select * FROM `t_television_program_content` WHERE video_introduction LIKE '%" + name + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}

//查找一条视频
function findFun(client, str, callback){
    client.query(str, function(err, result, fields){
        if(err){
            throw err;
            res.json({code: 0, message: '操作失败'})
        }
        callback(result);
    })
}


//查找所有视频
function findAllFun(client, callback) {
    client.query('select * from `t_television_program_content`', function(err, result, fields) {
        if (err) throw err;

        callback(result);
    })
}

//更新视频
function update(client, id, videoName, callback) {
    client.query('UPDATE `t_television_program_content` SET `video_introduction`=' + videoName + ' WHERE (`television_program_content_id`=' + videoName + ')', function(err) {
        if (err) throw err;

        callback(result);
    })
}

//------------------微众杂志----------------------
function findY(client, callback){
    client.query("SELECT * FROM `t_magazine_program`", function(err, result, fields){
        if(err) throw err;

        callback(result);
    })
}

//添加期数
function addPeriod(client, magazine_journal_no, magazine_journal_title, path, note) {
    client.query('INSERT INTO `t_magazine_program` (`magazine_journal_no`, `magazine_journal_title`, `magazine_journal_picture`, `note`) VALUES (' + magazine_journal_no + ', ' + magazine_journal_title + ', ' + path + ', ' + note + ')"')
}

//单个查询期数
function findM(client, id, callback) {
    var str = "SELECT * FROM `t_magazine_program` WHERE id = " + id + ""
    client.query(str, function(err, result) {
        if (err) throw err;

        callback(result);
    })
}

//全部期数查询
function findMA(client, id, callback) {
    client.query("select * FROM `t_magazine_program` WHERE magazine_journal_no LIKE '%" + id + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}

//期数删除
function deleteM(client, id, callback) {
    client.query("DELETE FROM `t_magazine_program` WHERE (`magazine_journal_no`='" + name + "')", function(err) {
        if (err) throw err;
    })
}


//---------文章模块------------

//文章添加
function addA(client, id, title, content, author) {
    client.query("INSERT INTO `t_television_program_content` (`television_program_id`, `thumbnails_url`, `video_url`, `video_introduction`, `video_introduction`, `video_timestamp`, `note`) VALUES ('" + id + "', '" + post_url + "', '" + url + "', '" + title + "', '" + time + "', '" + note + "')")
}

//查询所有文章
function findAA(client, callback){
    client.query("SELECT * FROM `t_magazine_list`", function(err, result){
        if(err) throw err;
        callback(result);
    })
}

//查询期数
function findQ(client, id){
    client.query("SELECT * FROM `t_magazine_program` WHERE magazine_program_id = "+id+" ", function(err, result){
        console.log(result);
        return result[0].magazine_journal_no;
    })
}

//模糊查询文章
function findAR(client, id, callback) {
    client.query("select * FROM `t_magazine_list` WHERE list_title LIKE '%" + id + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}


//--------广播台模块

//添加栏目
function addC(client, name, date) {
    client.query("INSERT INTO `t_radio_program` (`program_name`, `program_date`) VALUES ('" + name + "', '" + post_url + ")", function(err) {
        if (err) throw err;
    })
}

//栏目查询
function findL(client, name) {
    client.query("select * FROM `t_radio_program` WHERE program_name LIKE '%" + name + "%' ", function(err) {
        if (err) throw err;
    })
}

//栏目修改
function updateL(client, id, name, date) {
    client.query('UPDATE `t_radio_program` SET `program_name` = ' + name + ', `program_date` = ' + date + ' WHERE (`program_id`="' + id + '") ', function(err) {
        if (err) throw err;
    })
}

//栏目删除
function deleteL(client, name, date) {
    client.query("DELETE FROM `t_radio_program` WHERE (`program_name`='" + name + "')", function(err) {
        if (err) throw err;
    })
}

//首页轮播添加
function addP(client, url) {
    client.query("INSERT INTO `t_radio_carousel` (`picture_url`) VALUES ('" + url + "')", function(err) {
        if (err) throw err;
    })
}

//广播添加
function addV(client, r_url, url, intro) {
    client.query("INSERT INTO `t_radio_content` (`program_picture_url`, `program_audio_url`, `program_introduction`) VALUES ('" + r_url + "', '" + url + ", " + intro + ")", function(err) {
        if (err) throw err;
    })
}

//广播查询
function findV(client, name) {
    client.query("SELECT")
}



//--------反馈管理-----------

//全部反馈查询
function findF(client, callback){
    client.query("SELECT * FROM `feedbackinfo`", function(err, result){
        if(err){
            throw err;
        }
        callback(result);
    })
}

//单个反馈查询
function feedback(client, id, callback) {
    client.query("SELECT * FROM `feedbackinfo` WHERE id = " + id + "", function(err, result) {
        if(err){
            throw err;
        }
        callback(result);
    });
}

exports.connect = connectServer;
exports.select = selectFun;
exports.insertVideoFun = insertVideoFun;
exports.deleteVideoFun = deleteVideoFun;
exports.findFun = findFun;
exports.findAllFun = findAllFun;
exports.update = update;
exports.addPeriod = addPeriod;
exports.findAA = findAA;
exports.findQ = findQ;
exports.findTo = findTo;
exports.findM = findM;
exports.findMA = findMA;
exports.findY = findY;
exports.deleteM = deleteM;
exports.addC = addC;
exports.findL = findL;
exports.updateL = updateL;
exports.deleteL = deleteL;
exports.addP = addP;
exports.addV = addV;
exports.feedback = feedback;
exports.findF = findF;