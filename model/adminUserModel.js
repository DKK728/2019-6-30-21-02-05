const sqlhelper = require('./sqlhelper');
const connection = sqlhelper.sqlConnection;
module.exports = {
    validateEmailAndPassword(email,password,callback){
        // console.log(email);
        // console.log(password);
        let sql = `SELECT * from users WHERE email='${email}' and \`password\`='${password}'`
        connection.query(sql,(err,result)=>{
            callback(err,result[0]);
        });
    },
    getAllUser(callback){
        let sql = `select * from users where isDelete=0`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    changeUserIsdelete(id,callback){
        let sql = `update users set isDelete=1 where id=${id}`;
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    getUserById(id,callback){
        let sql = `select * from users where id=${id} and isDelete=0`;
        connection.query(sql,(err,result)=>{
            // console.log(result)
            // console.log(result[0])
            callback(err,result[0]);
        })
    },
    updateUser(data,callback){
        // console.log(data);
        //↑拿到数据对象
        let sql =`update users set email='${data.email}',slug='${data.slug}',nickname='${data.nickname}',\`password\`='${data.password}' where id='${data.id}'`
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    },
    addNewUser(data,callback){
        let sql =`insert into users set email='${data.email}',slug='${data.slug}',nickname='${data.nickname}',\`password\`='${data.password}',status='activated',isDelete='0',avatar='/uploads/avatar.jpg'`
        connection.query(sql,(err,result)=>{
            callback(err,result);
        })
    }
}