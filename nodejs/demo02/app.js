const http = require('http');
const url = require('url');

var api = 'http://www.itying.com?name=aaa&age=21';

// console.log(url.parse(api, true));

var getValue = url.parse(api, true).query;
// console.log(getValue);
// console.log(`姓名：${getValue.name} -- 年龄：${getValue.age}`);

/* 
    req
    获取客户端传过来的信息
    resp
    给浏览器响应信息 
*/

http.createServer((req, resp) => {

    //设置响应头
    //状态码是200，文件类型是html, 字符集是utf-8
    resp.writeHead(200, { 'Content-type': "text/html;charset='utf-8'" });

    // 解决乱码
    resp.write("<head><meta charset='UTF-8'></head>");

    console.log(req.url); //获取浏览器访问的地址

    if (req.url != '/favicon.ico') {
        var useInfo = url.parse(req.url, true).query;
        console.log(useInfo);
        console.log(`姓名：${useInfo.name} -- 年龄：${useInfo.age}`);
    }
    // resp.write('this is nodejs');

    resp.write('<h2>你好，nodejs！</h2>');

    // 结束响应
    resp.end();

}).listen(8080);