const sqlhelper = require('./sqlhelper');
const connection = sqlhelper.sqlConnection;
module.exports = {
    getCategories(callback){
        let sql =`SELECT * from categories where isDelete=0`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    getCategoriesById(id,callback){
        // console.log(id);
        let sql =`SELECT * from categories where id=${id} and isDelete=0`;
        connection.query(sql,(err,result)=>{
            callback(err,result[0]);
        })
    },
    updateCategoryIsDelete(id,callback){
        // console.log(id)
        let sql =`update categories set isDelete=1 where id=${id} and isDelete=0`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    addNewCategory(data,callback){
        // console.log(data)
        let sql =`insert into categories set \`name\`='${data.name}',slug='${data.slug}',classname='${data.classname}'`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    updateCategoryById(data,callback){
        // console.log(data)
        let sql =`update categories set name='${data.name}',slug='${data.slug}',classname='${data.classname}' where id=${data.id}`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    }
}