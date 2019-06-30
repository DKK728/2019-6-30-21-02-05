const userModel = require('../model/adminUserModel')
module.exports = {
    adminDoLogin(req,res){
        userModel.validateEmailAndPassword(req.body.email,req.body.password,(err,result)=>{
            // console.log(req.body);
            // console.log(req.body.password);
            if(err) console.error(err);
            let resObj = {};
            if(result){
                // console.log(result)
                resObj.code = 200;
                resObj.msg = '登录成功'
                req.session.isLogin = true;
                req.session.userInfo = result;
            }else {
                console.log(result)
                resObj.code = 401;
                resObj.msg = '登录失败'
            }
            res.send(resObj);
        });
    },
    adminRemoveUser(req,res){
        userModel.changeUserIsdelete(req.body.id,(err,result)=>{
            // console.log(req)
            if(err) console.error(err);
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200;
                resObj.msg = '删除成功'
            }else {
                resObj.code = 401;
                resObj.msg = '删除失败'
            }
            res.send(resObj);
        });
    },
    adminGetUserById(req,res){
        userModel.getUserById(req.query.id,(err,result)=>{
            if(err) console.error(err);
            let resObj = {};
            if(result){
                resObj.code = 200;
                resObj.msg = '找到了';
                resObj.email = result.email;
                resObj.slug = result.slug;
                resObj.nickname = result.nickname;
                resObj.avatar = result.avatar;
                resObj.status = result.status;
            }else{
                resobj.code = 401;
                resobj.msg = '没找到';
            }
            res.send(resObj);
        })
    },
    adminGetHeadAndName(req,res){
        if(req.session.userInfo){
        let {nickname,avatar} = req.session.userInfo;
        res.send({
            code :200,
            msg:'成功',
            data :{
                nickname,avatar
            }
        });
        }else {
            res.send({
                code :401,
                mag:'失败'
            })
        }
    },
    adminUpdateUser(req,res){
        userModel.updateUser(req.body,(err,result)=>{
            if(err) console.error(err);
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200;
                resObj.msg = '更新成功'
            }else {
                resObj.code = 401;
                resObj.msg = '更新失败'
            }
            res.send(resObj)
        });
    },
    adminAddNewUser(req,res){
        userModel.addNewUser(req.body,(err,result)=>{
            if(err) console.error(err);
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200;
                resObj.msg = '添加成功'
            }else {
                resObj.code = 401;
                resObj.msg = '添加失败'
            }
            res.send(resObj)
        })
    }
}