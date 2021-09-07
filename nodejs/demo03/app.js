const http = require('http'); // 系统模块
//http://www.itying.com/api/plist
const tools = require('./module/tools'); // 自定义模块
var request = require('./module/request');

console.log(tools);
// console.log(typeof (request));
console.log(request); // { obj: { get: [Function: get], post: [Function: post] } }
// request.post();



// const axios = require('./node_modules/axios/index');
// const axios = require('axios/index');
const axios = require('axios');
axios.get();
axios.post();

var db = require('db'); // 错误写法 nodejs默认会找node_modules对应模块里面的index.js
db.add();



http.createServer((req, resp) => {

    //设置响应头
    //状态码是200，文件类型是html, 字符集是utf-8
    resp.writeHead(200, { 'Content-type': "text/html;charset='utf-8'" });

    // 解决乱码
    resp.write("<head><meta charset='UTF-8'></head>");
    resp.write('<h2>你好，nodejs！</h2>');

    var api = tools.formatApi('api/focus');
    resp.write(api);

    // 结束响应
    resp.end();

}).listen(8090);
