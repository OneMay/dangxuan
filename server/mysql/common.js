var formidable = require('formidable')
var fs = require('fs');
//上传图片与视频
function upload(req, callback) {
    var form = new formidable.IncomingForm(),
        AVATAR_UPLOAD_FOLDER = '/avatar/',
        domain = "http://localhost:3000"
    form.encoding = 'utf-8';
    form.uploadDir = '../public' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        console.log(fields);
        if (err) {
            res.locals.error = err;
            return;
        }

        var extName = ''; //后缀名
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

        var avatarName = Math.random() + '.' + extName;
        var newPath = form.uploadDir + avatarName;
        var showUrl = domain + AVATAR_UPLOAD_FOLDER + avatarName;
        fs.renameSync(files.videoPoster.path, newPath);
        callback(fields, showUrl);
    })

    //return showUrl;
}

function filter() {

}

exports.upload = upload;