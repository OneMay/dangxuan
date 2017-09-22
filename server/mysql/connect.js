var mysql = require('mysql');
var config = require('../config/config.js')


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

//查找一条视频
function findFun(client, name, callback){
    client.query('select * from `t_television_program_content` where video_introduction="'+name+'"', function(err, result, fields){
        if(err) throw err;

        callback(results);
    })
}

//查找所有视频
function findAllFun(client, callback){
    client.query('select * from `t_television_program_content`', function(err, result, fields){
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

exports.connect = connectServer;
exports.select = selectFun;
exports.insertVideoFun = insertVideoFun;
exports.deleteVideoFun = deleteVideoFun;
exports.findFun = findFun;
exports.update = update;
exports.addPeriod = addPeriod;