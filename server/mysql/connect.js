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

function selectFun(client, username, password, callback){
    client.query('select * from t_user where user_no="'+username+'" and password="'+password+'"', function(err, result, fields){
        if(err) throw err;

        callback(result);
    })
}

function insertVideoFun(client, id, post_url, url, title, time, note, callback){
    client.query("INSERT INTO `t_television_program_content` (`television_program_id`, `thumbnails_url`, `video_url`, `video_introduction`, `video_introduction`, `video_timestamp`, `note`) VALUES ('"+id+"', '"+post_url+"', '"+url+"', '"+title+"', '"+time+"', '"+note+"')");
}

function deleteVideoFun(client, name, callback){
    client.query("DELETE FROM `t_television_program_content` WHERE (`television_program_id`='"+name+"')", function(err){
        if(err) throw err;
        
        callback(err);
    });
}

function findFun(client, name, callback){
    client.query('select * from `t_television_program_content` where video_introduction="'+name+'"', function(err, result, fields){
        if(err) throw err;

        callback(results);
    })
}

function findAllFun(client, callback){
    client.query('select * from `t_television_program_content`', function(err, result, fields){
        if(err) throw err;

        callback(results);
    })
}

exports.connect = connectServer;
exports.select = selectFun;
exports.insertVideoFun = insertVideoFun;
exports.deleteVideoFun = deleteVideoFun;