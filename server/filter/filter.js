function authorize (req, res, next){
    if(!req.session.user_id){
        var o = { code: 0, message: '身份验证失败', username: null }
        res.json(o);
    }
    else{
        next();
    }
}

exports.authorize = authorize;