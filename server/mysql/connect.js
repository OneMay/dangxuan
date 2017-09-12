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
    client.query('select * from User where username="'+username+'" and password="'+password+'"', function(err, result, fields){
        if(err) throw err;

        callback(results);
    })
}

exports.connect = connectServer;
exports.select = selectFun;
