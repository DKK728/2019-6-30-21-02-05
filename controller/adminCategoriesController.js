const adminCategoriesModel = require('../model/adminCategoriesModel');
module.exports  = {
    getCategoriesById(req,res){
        adminCategoriesModel.getCategoriesById(req.body.id,(err,result)=>{
            if(err) console.error(err)
            // console.log(result)
            let resObj = {};
            if(result){
                resObj.code = 200,
                resObj.msg = '成功',
                resObj.slug = result.slug,
                resObj.name = result.name,
                resObj.classname = result.classname,
                resObj.isShow = result.isShow
            }else{
                resObj.code = 401,
                resObj.msg = '失败'
            }
            res.send(resObj);
        })
    },
    adminRemoverCategoryById(req,res){
        adminCategoriesModel.updateCategoryIsDelete(req.body.id,(err,result)=>{
            if(err) console.error(err)
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200,
                resObj.msg = '删除成功'
            }else{
                resObj.code = 401,
                resObj.msg = '删除失败'
            }
            res.send(resObj);
        })
    },
    adminAddNewCategory(req,res){
        adminCategoriesModel.addNewCategory(req.body,(err,result)=>{
            if(err) console.error(err)
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200,
                resObj.msg = '新增成功'
            }else{
                resObj.code = 401,
                resObj.msg = '新增失败'
            }
            res.send(resObj);
        })
    },
    adminUpdateCategoryById(req,res){
        adminCategoriesModel.updateCategoryById(req.body,(err,result)=>{
            if(err) console.error(err)
            let resObj = {};
            if(result.affectedRows == 1){
                resObj.code = 200,
                resObj.msg = '修改成功'
            }else{
                resObj.code = 401,
                resObj.msg = '修改失败'
            }
            res.send(resObj);
        })
    }
}