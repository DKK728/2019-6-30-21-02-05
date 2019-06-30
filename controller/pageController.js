const userModel = require('../model/adminUserModel');
const categoriesModel = require('../model/adminCategoriesModel');
const adminPostsModel = require('../model/adminPostsModel')
const moment = require('moment')
module.exports = {
    getIndex(req,res){
        res.render('index')
    },
    getList(req,res){
        res.render('list')
    },
    getDetail(req,res){
        res.render('detail')
    },
    getAdminIndex(req,res){
        // console.log(req.session);
        if(req.session.isLogin){
        res.render('admin/index',{});
        }else{
            res.send('<script>location.href="/admin/login";</script>')
        }
    },
    getCategories(req,res){
        if(req.session.isLogin){
            categoriesModel.getCategories((err,result)=>{
                if(err) console.error(err);
                res.render('admin/categories',{arr:result});
            })
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getComments(req,res){
        if(req.session.isLogin){
            res.render('admin/comments');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getLogin(req,res){
        res.render('admin/login')
    },
    getPasswordReset(req,res){
        if(req.session.isLogin){
            res.render('admin/password-reset');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getPostAdd(req,res){
        if(req.session.isLogin){
            res.render('admin/post-add');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getPosts(req,res){
        if(req.session.isLogin){
            // adminPostsModel.getPosts((err,result)=>{
            //     if(err) console.error(err);
            //     result.forEach(e =>{
            //         e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss')
            //     })
                // res.render('admin/posts',{arr:result});
            // })
            res.render('admin/posts');
            }else{
                res.send("<script>location.href='/admin/login';</script>")
            }
    },
    getProfile(req,res){
        if(req.session.isLogin){
            res.render('admin/profile');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getSettings(req,res){
        if(req.session.isLogin){
            res.render('admin/settings');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getSlides(req,res){
        if(req.session.isLogin){
            res.render('admin/slides');
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    },
    getUsers(req,res){
        if(req.session.isLogin){
            userModel.getAllUser((err,result)=>{
                // console.log(result)
                if(err) console.error(err)
                res.render('admin/users',{data: result});
            })
            }else{
                res.send('<script>location.href="/admin/login";</script>')
            }
    }
}