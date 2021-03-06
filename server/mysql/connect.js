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

//登陆
function selectFun(client, username, password, callback) {
    client.query('select * from t_user where user_no="' + username + '" and password="' + password + '"', function(err, result, fields) {
        if (err) throw err;
        callback(result);
    })
}

//插入新的视频
function insertVideoFun(client, id, post_url, url, title, time, note) {
    client.query("INSERT INTO `t_television_program_content` (`television_program_id`, `thumbnails_url`, `video_url`, `video_introduction`, `video_timestamp`, `note`) VALUES ('" + id + "', '" + post_url + "', '" + url + "', '" + title + "', '" + time + "', '" + note + "')", function(err, result) {
        if (err) throw err;
    });
}

//删除视频
function deleteVideoFun(client, name, callback) {
    client.query("DELETE FROM `t_television_program_content` WHERE (`television_program_content_id`='" + name + "')", function(err) {
        if (err) throw err;
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

//查找
function findFun(client, str, callback) {
    client.query(str, function(err, result, fields) {
        if (err) {
            throw err;
            res.json({ code: 0, message: '操作失败' })
        }
        callback(result);
    })
}

//查找一条视频
function findO(client, id, callback) {
    client.query("SELECT * FROM `t_television_program_content` WHERE television_program_content_id = " + id + "", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}
//查询视频分类
function findC(client, id, callback) {
    client.query("SELECT * FROM `t_television_program` WHERE television_program_id = " + id + " ", function(err, result) {
        if (err) throw err;
        callback(result);
        return result[0].television_title;
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
function update(client, programid, id, showUrl, showUrl_1, videoName, date, note) {
    note = note || 'admin';
    console.log("UPDATE `t_television_program_content` SET `video_introduction`=" + '"' + videoName + '"' + "," + `television_program_id` + "=" + '"' + programid + '"' + "," + `thumbnails_url` + "=" + '"' + showUrl + '"' + "," + `video_url` + "=" + '"' + showUrl_1 + '"' + "," + `video_introduction` + "=" + '"' + videoName + '"' + "," + `video_timestamp` + "=" + '"' + date + '"' + "," + `note` + "=" + '"' + note + '"' + "WHERE (`television_program_content_id`=" + id + ")")
    client.query("UPDATE `t_television_program_content` SET `video_introduction`=" + '"' + videoName + '"' + "," + `television_program_id` + "=" + '"' + programid + '"' + "," + `thumbnails_url` + "=" + '"' + showUrl + '"' + "," + `video_url` + "=" + '"' + showUrl_1 + '"' + "," + `video_introduction` + "=" + '"' + videoName + '"' + "," + `video_timestamp` + "=" + '"' + date + '"' + "," + `note` + "=" + '"' + note + '"' + "WHERE (`television_program_content_id`=" + id + ")", function(err) {
        if (err) throw err;
    })
}

//------------------微众杂志----------------------
function findY(client, callback) {
    client.query("SELECT * FROM `t_magazine_program`", function(err, result, fields) {
        if (err) throw err;

        callback(result);
    })
}

//添加期数
function addPeriod(client, magazine_journal_no, magazine_journal_title, path, time, note, callback) {
    client.query("INSERT INTO `t_magazine_program` (`magazine_journal_no`, `magazine_journal_title`, `magazine_journal_picture_url`,`magazine_journal_timestamp`, `note`) VALUES (' " + magazine_journal_no + " ',  ' " + magazine_journal_title + " ', ' " + path + " ', ' " + time + " ', '" + note + "')", function(err, result, fields) {
        if (err) throw err;

        callback(result);
    })
}

//单个查询期数
function findM(client, magazine_journal_no, callback) {
    client.query("SELECT * FROM `t_magazine_program` WHERE magazine_journal_no LIKE '%" + magazine_journal_no + "%' ", function(err, result) {
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
    client.query("DELETE FROM `t_magazine_program` WHERE (`magazine_program_id`='" + id + "')", function(err) {
        if (err) throw err;
        callback();
    })
}

//期数修改
function updateP(client, magazine_journal_no, magazine_journal_title, path, note, magazine_program_id, time, callback) {
    console.log("UPDATE `t_magazine_program` SET `magazine_journal_no`=" + '"' + magazine_journal_no + '"' + "," + `magazine_journal_title` + "=" + '"' + magazine_journal_title + '"' + "," + `magazine_journal_picture_url` + "=" + '"' + path + '"' + "," + `note` + "=" + '"' + note + '"' + "WHERE (`magazine_program_id`=" + magazine_program_id + ")")
    client.query("UPDATE `t_magazine_program` SET `magazine_journal_no`=" + '"' + magazine_journal_no + '"' + "," + `magazine_journal_title` + "=" + '"' + magazine_journal_title + '"' + "," + `magazine_journal_picture_url` + "=" + '"' + path + '"' + "," + `magazine_journal_timestamp` + "=" + '"' + time + '"' + "," + `note` + "=" + '"' + note + '"' + "WHERE (`magazine_program_id`=" + magazine_program_id + ")", function(err) {
        if (err) throw err;
        callback();
    })

}
//---------文章模块------------

//文章添加
function addA(client, id, title, content, author, time, callback) {
    var note = '';
    client.query("INSERT INTO `t_magazine_list` ( `list_title`, `magazine_program_id`, `list_content`, `list_writer`, `insert_time`, `note`) VALUES ('" + title + "', '" + id + "', '" + content + "', '" + author + "', '" + time + "', '" + note + "')", function(err) {
        if (err) throw err;
        callback();
    })
}

//查询所有文章
function findAA(client, callback) {
    client.query("SELECT * FROM `t_magazine_list`", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}

//模糊查询文章
function findAllA(client, list_title, callback) {
    client.query("SELECT * FROM `t_magazine_list` WHERE list_title LIKE '%" + list_title + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}
//查询期数
function findQ(client, id, callback) {
    client.query("SELECT * FROM `t_magazine_program` WHERE magazine_program_id = " + id + " ", function(err, result) {
        if (err) throw err;
        callback(result);
        console.log(result[0].magazine_journal_no);
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

//删除文章
function delA(client, id, callback) {
    client.query("DELETE FROM `t_magazine_list` WHERE (`magazine_list_id`='" + id + "')", function(err) {
        if (err) throw err;
        callback(err);
    })
}

//文章修改
function updateA(client, id, listId, title, content, author, time, callback) {
    var note = '';
    //console.log(content.toString())
    client.query("UPDATE `t_magazine_list` SET `list_title`=" + '"' + title + '"' + "," + `magazine_program_id` + "=" + '"' + id + '"' + "," + `list_content` + "=" + "'" + content + "'" + "," + `list_writer` + "=" + '"' + author + '"' + "," + `insert_time` + "=" + '"' + time + '"' + "," + `note` + "=" + '"' + note + '"' + "WHERE (`magazine_list_id`=" + listId + ")", function(err) {
        if (err) throw err;
        callback();
    })

}
//--------广播台模块----------

//添加栏目
function addC(client, name, date, time, url) {
    client.query("INSERT INTO `t_radio_program` (`program_name`, `program_date`, `program_timestamp`, `program_picture_url`) VALUES ('" + name + "', ' " + date + " ', ' " + time + " ', ' " + url + " ')", function(err) {
        if (err) throw err;
    })
}

//全部栏目查询
function findAL(client, callback) {
    client.query("SELECT * FROM `t_radio_program`", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}
//栏目查询
function findL(client, name, callback) {
    client.query("select * FROM `t_radio_program` WHERE program_name LIKE '%" + name + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}

//栏目修改
function updateL(client, id, name, date, time, url) {
    client.query('UPDATE `t_radio_program` SET `program_name` = "' + name + '", `program_date` = "' + date + '", `program_timestamp` = "' + time + '", `program_picture_url` = "' + url + '" WHERE (`program_id`="' + id + '") ', function(err) {
        if (err) throw err;
    })
}

//栏目删除
function deleteL(client, name, callback) {
    client.query("DELETE FROM `t_radio_program` WHERE (`program_id`='" + name + "')", function(err) {
        if (err) throw err;
        callback()
    })
}
//广播删除
function deleteAL(client, id, callback) {
    client.query("DELETE FROM `t_radio_content` WHERE (`program_content_id`='" + id + "')", function(err) {
        if (err) throw err;
        callback()
    })
}
//首页轮播添加
function addP(client, url, time) {
    client.query("INSERT INTO `t_radio_carousel` (`picture_url`, `picture_timestamp`) VALUES ('" + url + "', '" + time + "')", function(err) {
        if (err) throw err;
    })
}

//广播添加
function addV(client, r_url, url, intro, time, id) {
    client.query("INSERT INTO `t_radio_content` (`program_picture_url`, `program_audio_url`, `program_introduction`, `program_audio_timestamp`, `program_id`) VALUES ('" + r_url + "', '" + url + "', '" + intro + "', '" + time + "', '" + id + "')", function(err) {
        if (err) throw err;
    })
}
//广播修改
function updateV(client, r_url, url, intro, time, id, cid) {
    client.query('UPDATE `t_radio_content` SET `program_picture_url` = "' + r_url + '", `program_audio_url` = "' + url + '", `program_introduction` = "' + intro + '", `program_audio_timestamp` = "' + time + '", `program_id` = "' + id + '" WHERE (`program_content_id`="' + cid + '") ', function(err) {
        if (err) throw err;
    })
}
//栏目
function findAQ(client, id, callback) {
    client.query("SELECT * FROM `t_radio_program` WHERE program_id = " + id + " ", function(err, result) {
        if (err) throw err;
        callback(result);
        // console.log(result[0].magazine_journal_no);
        //return result[0].magazine_journal_no;
    })
}
//广播查询
function findV(client, callback) {
    client.query("SELECT * FROM `t_radio_content`", function(err, result) {
        if (err) throw err;
        callback(result)
    })
}

//广播单个查询
function findVL(client, name, callback) {
    client.query("select * FROM `t_radio_content` WHERE program_name LIKE '%" + name + "%' ", function(err, result) {
        if (err) throw err;
        callback(result);
    })
}


//--------反馈管理-----------

//全部反馈查询
function findF(client, callback) {
    client.query("SELECT * FROM `feedbackinfo`", function(err, result) {
        if (err) {
            throw err;
        }
        callback(result);
    })
}

//单个反馈查询
function feedback(client, id, callback) {
    client.query("SELECT * FROM `feedbackinfo` WHERE id = " + id + "", function(err, result) {
        if (err) {
            throw err;
        }
        callback(result);
    });
}

exports.connect = connectServer;
exports.selectFun = selectFun;
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
exports.delA = delA;
exports.addC = addC;
exports.findL = findL;
exports.findAL = findAL;
exports.findV = findV;
exports.findVL = findVL;
exports.updateL = updateL;
exports.deleteL = deleteL;
exports.addP = addP;
exports.addV = addV;
exports.addA = addA;
exports.feedback = feedback;
exports.findF = findF;
exports.findO = findO;
exports.findC = findC;
exports.findL = findL;
exports.updateA = updateA;
exports.updateP = updateP;
exports.findAllA = findAllA;
exports.findAQ = findAQ;
exports.deleteAL = deleteAL;
exports.updateV = updateV;