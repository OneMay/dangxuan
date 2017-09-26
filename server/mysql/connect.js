var mysql = require('mysql');
var config = require('../config/config.js')

//连接数据库
function  connectServer(){
    var client = mysql.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
        database: config.database
    })
    
    return client;
}

//查找视频
function selectFun(client, username, password, callback){
    client.query('select * from t_user where user_no="'+username+'" and password="'+password+'"', function(err, result, fields){
        if(err) throw err;

        callback(result);
    })
}

//插入新的视频
function insertVideoFun(client, id, post_url, url, title, time, note, callback){
    client.query("INSERT INTO `t_television_program_content` (`television_program_id`, `thumbnails_url`, `video_url`, `video_introduction`, `video_introduction`, `video_timestamp`, `note`) VALUES ('"+id+"', '"+post_url+"', '"+url+"', '"+title+"', '"+time+"', '"+note+"')");
}

//删除视频
function deleteVideoFun(client, name, callback){
    client.query("DELETE FROM `t_television_program_content` WHERE (`television_program_id`='"+name+"')", function(err){
        if(err) throw err;
        callback(err);
    });
}

//查找视频总数
function findTo(client, name, callback){
    client.query("select * FROM `t_television_program_content` WHERE video_introduction LIKE '%"+name+"%' ", function(err, result){
        if(err) throw err;
        callback(result);
    })
}

//查找一条视频
function findFun(client, name, str, callback){
    client.query(str, function(err, result, fields){
        if(err) throw err;
        callback(result);
    })
}


//查找所有视频
function findAllFun(client, str, callback){
    client.query(str, function(err, result, fields){
        if(err) throw err;
        callback(results);
    })
}

//更新视频
function update(client, id, videoName, callback){
    client.query('UPDATE `t_television_program_content` SET `video_introduction`='+videoName+' WHERE (`television_program_content_id`='+videoName+')', function(err){
        if(err) throw err;

        callback(results);
    })
}

//添加期数
function addPeriod(client, magazine_journal_no, magazine_journal_title, path, note){
    client.query('INSERT INTO `t_magazine_program` (`magazine_journal_no`, `magazine_journal_title`, `magazine_journal_picture`, `note`) VALUES ('+ magazine_journal_no+', '+magazine_journal_title+', '+path+', '+note+')"')
}

//单个查询期数
function findM(client, id, callback){
    var str = "SELECT * FROM `t_magazine_program` WHERE id = "+id+""
    client.query(str, function(err, result){
        if(err) throw err;

        callback(result);
    })
}

exports.connect = connectServer;
exports.select = selectFun;
exports.insertVideoFun = insertVideoFun;
exports.deleteVideoFun = deleteVideoFun;
exports.findFun = findFun;
exports.update = update;
exports.addPeriod = addPeriod;
exports.findTo = findTo;
exports.findM = findM;