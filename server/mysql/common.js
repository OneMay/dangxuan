var formidable = require('formidable')
var fs = require('fs');
//上传图片与视频
function upload(req, callback) {
    var form = new formidable.IncomingForm(),
        AVATAR_UPLOAD_FOLDER = '/public/avatar/',
        domain = "http://localhost:3000"
    form.encoding = 'utf-8';
    form.uploadDir = '../../dist/' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        if (err) {
            res.locals.error = err;
            return;
        }

        var extName = ''; //后缀名
        var extName_1 = '';
        switch (files.videoPoster.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
                extName = 'png';
                break;
            case 'image/x-png':
                extName = 'png';
                break;
        }

        if (extName.length == 0) {
            res.locals.error = '只支持png和jpg格式图片';
            return;
        }

        switch(files.video.type){
            case 'video/mp4':
                extName_1 = 'mp4';
                break;
        }
            

        var avatarName = Math.random() + '.' + extName;
        var avatarName_1 = Math.random() + '.' + extName_1;
        var newPath = form.uploadDir + avatarName;
        var newPath_1 = form.uploadDir + avatarName_1;
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        var showUrl_1 = domain + AVATAR_UPLOAD_FOLDER + avatarName_1;
        fs.renameSync(files.videoPoster.path, newPath);
        fs.renameSync(files.video.path, newPath_1);
        callback(fields, showUrl, showUrl_1);
    })
}

exports.upload = upload;