// 1、导入项目依赖
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const login = require("./router/loginRouter");
const device = require("./router/deviceRouter"); // 设备管理
const user = require("./router/userRouter");
const park = require("./router/parkRouter");

const app = express();

// 打印日志
app.use(logger("dev"));
// 解析post方法
app.use(bodyParser.urlencoded({ extended: false })); // 配置post的body模块
app.use(bodyParser.json()); // 将数据转换为json

// 根据不同功能划分模块使用路由
app.use(login);
app.use(device);
app.use(user);
app.use(park);

// 配置静态资源
app.use(express.static(__dirname + "/static"));
// 配置网页小icon
app.use(favicon(__dirname + "/static/img/1206767.png"));

// 当发生404页面错误的时候返回一个404.html文件
app.use(function (req, resp) {
    resp.status(404);
    // 重定向
    resp.redirect("/page/404.html");
});

app.listen(8080, () => {
    console.log("服务器在8080端口启动中……");
});