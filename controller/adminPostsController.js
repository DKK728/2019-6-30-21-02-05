const postModel = require('../model/adminPostsModel')
const categoriesModel = require('../model/adminCategoriesModel')
const moment = require('moment')
const formidable = require('formidable')
module.exports = {
    getPostsByPage(req,res){
        // console.log(req,body)
        let {pageIndex,pageSize} = req.body;
        postModel.getPostsByPage(pageIndex,pageSize,(err,result)=>{
            if(err) console.error(err);
            let resObj = {};
            if(result.length > 0){
                resObj.code = 200;
                resObj.msg = '成功';
                result.forEach(e=>{
                    e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss')
                })
                resObj.data = result;
                // console.log(result);
                //获取最大页码数
                postModel.getPostCount((err,result)=>{
                    let total = result[0].total;
                    let maxPage = Math.ceil(total/pageSize);
                    // console.log(maxPage);
                    resObj.maxPage = maxPage;
                    res.send(resObj);
                })
            }else {
                resObj.code = 401;
                resObj.msg = '失败'
                res.send(resObj);
            }
            
        })
    },
    getAllCategories(req,res){
        categoriesModel.getCategories((err,result)=>{
            if(err) console.error(err);
            let resObj = {};
            if(result.length > 0 ){
                resObj.code =200;
                resObj.msg = '成功';
                resObj.data = result;
                res.send(resObj)
            }else{
                resObj.code = 401;
                resObj.msg = '失败'
                res.send(resObj)
            }
        })
    },
    getPostsByFilter(req,res){
            console.log(req.body)
            let {filter,status,pageIndex,pageSize} = req.body;
            let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` from posts join users on user_id=users.id join categories on category_id=categories.id  `
            let condition = '';
            if(filter != 'all' || status != 'all'){
                condition += `  where  `;
            }
            if(filter != 'all'){
                condition += `  posts.category_id=${filter}  `;
            }
            if(status != 'all'){
                if(filter != 'all'){
                    condition += `  and  `
                }
                condition += `  posts.\`status\`='${status}'  `;
            }
            sql += condition;
            sql += `  limit ${(pageIndex -1)*pageSize},${pageSize}`;
            console.log(sql)
            postModel.getPostsByFilter(sql,(err,result)=>{
                if(err) console.error(err);
                let resObj = {};
                if(result.length > 0){
                    resObj.code = 200;
                    resObj.msg = '成功';
                    result.forEach(e=>{
                        e.created = moment(e.created).format('YYYY-MM-DD HH:mm:ss')
                    })
                    resObj.data = result;
                    // console.log(result);
                    //获取最大页码数
                    postModel.getPostCount(condition,(err,result)=>{
                        let total = result[0].total;
                        let maxPage = Math.ceil(total/pageSize);
                        // console.log(maxPage);
                        resObj.maxPage = maxPage;
                        res.send(resObj);
                    })
                }else {
                    resObj.code = 401;
                    resObj.msg = '失败'
                    res.send(resObj);
                }
            })
    },
    uploadImage(req,res){
        let form = new formidable.IncomingForm();
        form.uploadDir = __dirname + '/../uploads'
        form.keepExtensions = true;
        form.parse(req,(err,fileds,files)=>{
            let resObj = {
                code : 401,
                msg : '失败'
            }
            if(!err){
                resObj.code = 200;
                resObj.msg = '上传成功';
                let index = files.pic.path.indexOf('uploads')
                resObj.data = '/'+files.pic.path.substring(index)
            }
            res.send(resObj);
        })
    }
}