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

        switch (files.video.type) {
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

//上传海报
function upload_2(req, callback) {
    var form = new formidable.IncomingForm(),
        AVATAR_UPLOAD_FOLDER = '/public/avatar/',
        domain = "http://localhost:3000"
    form.encoding = 'utf-8';
    form.uploadDir = '../../dist/' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            return;
        }

        var extName = ''; //后缀名
        var extName_1 = '';
        switch (files.magazine_journal_picture.type) {
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
        fs.renameSync(files.magazine_journal_picture.path, newPath);
        callback(fields, showUrl);
    })
}

//上传广播台
function upload_3(req, callback) {
    var form = new formidable.IncomingForm(),
        AVATAR_UPLOAD_FOLDER = '/public/avatar/',
        domain = "http://localhost:3000"
    form.encoding = 'utf-8';
    form.uploadDir = '../../dist/' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            return;
        }

        var extName = ''; //后缀名
        switch (files.program_picture_url.type) {
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
        fs.renameSync(files.program_picture_url.path, newPath);
        callback(fields, showUrl);
    })
}


function upload_4(req, callback) {
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
        switch (files.radioPoster.type) {
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

        switch (files.radioInfo.type) {
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
        fs.renameSync(files.radioPoster.path, newPath);
        fs.renameSync(files.radioInfo.path, newPath_1);
        callback(fields, showUrl, showUrl_1);
    })
}

//上传广播台
function upload_5(req, callback) {
    var form = new formidable.IncomingForm(),
        AVATAR_UPLOAD_FOLDER = '/public/avatar/',
        domain = "http://localhost:3000"
    form.encoding = 'utf-8';
    form.uploadDir = '../../dist/' + AVATAR_UPLOAD_FOLDER;
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
        if (err) {
            res.locals.error = err;
            return;
        }

        var extName = ''; //后缀名
        switch (files.pictureInfo.type) {
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
        fs.renameSync(files.pictureInfo.path, newPath);
        callback(fields, showUrl);
    })
}

exports.upload = upload;
exports.upload_2 = upload_2;
exports.upload_3 = upload_3;
exports.upload_4 = upload_4;
exports.upload_5 = upload_5;