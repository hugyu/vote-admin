const express = require("express");
const app = express(); //实例化一个对象

const models = require("./models");
// 将请求路由指定到自定义的路径
// app.get('/', (req, res) => {
//     // req:请求对象
//     // res:响应对象
//     res.send("hello world")
// })
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'Express');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
// 当请求体content-type 是application/json时 将数据解析到req.body
app.use(express.json());
// 当请求体content-type 是application/x-www-form-urlencoded时 调用这个中间件
app.use(express.urlencoded({
  extended:true,
}))
models(app);
const port = 3005;
app.listen(port, () => {
  console.log(`listning on port ${port}`);
});