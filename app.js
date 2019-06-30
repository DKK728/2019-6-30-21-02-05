const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const port = 8080;
const ip = '127.0.0.1';
app.listen(port,ip,()=>{
    console.log(`http://${ip}:${port}/admin`)
});
//注册静态页面
app.use('/assets',express.static('assets'));
app.use('/uploads',express.static('uploads'));
//设置默认的模板引擎
app.set('view engine','ejs');
//注册router中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    secret:'abcdef',
    resave:false,
    saveUninitialized:true,
    // cookie:{secure:true}
}));
app.use(router);