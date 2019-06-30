const sqlhelper = require('./sqlhelper')
const connection = sqlhelper.sqlConnection;
module.exports = {
    getPosts(callback){
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` from posts join users on user_id=users.id join categories on category_id=categories.id`;
        connection.query(sql,(err,result)=>{
            callback(err,result)
        })
    },
    getPostsByPage(pageIndex,pageSize,callback){
        let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` from posts join users on user_id=users.id join categories on category_id=categories.id limit ${(pageIndex -1)*pageSize},${pageSize}`;
        connection.query(sql,(err,result)=>{
            callback(err,result)
        })
    },
    getPostCount(condition,callback){
        let sql = ` select count(*) as total from posts  ` + condition;
        connection.query(sql,(err,result)=>{
            callback(err,result)
        })
    },
    getPostsByFilter(sql,callback){
        // let sql = `SELECT posts.id,title,posts.\`status\`,created,nickname,\`name\` from posts join users on user_id=users.id join categories on category_id=categories.id where posts.category_id=${filter} limit ${(pageIndex -1)*pageSize},${pageSize}`;
        connection.query(sql,(err,result)=>{
            callback(err,result)
        })
    }
}