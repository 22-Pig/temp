const userDao = require("../dao/userDao");

module.exports = {
    addUser: (req, resp) => {
        let id = req.body.Id;
        let username = req.body.userName;
        let password = req.body.passWord;
        let message = req.body.messAge;

        let userArr = [id, username, password, message];
        userDao.addDB(userArr, function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.redirect("/page/user.html");
                }
                else {
                    resp.send("添加失败!");
                }
            }
        });
    },
    updateUser: (req, resp) => {
        let id = req.body.Id;
        let username = req.body.userName;
        let password = req.body.passWord;
        let message = req.body.messAge;

        let userArr = [username, password, message, id];
        userDao.updateDB(userArr, function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.redirect("/page/user.html");
                }
                else {
                    resp.send("修改失败!");
                }
            }
        });
    },
    queryUser: (req, resp) => {
        userDao.queryDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.send(data);
                } else {
                    resp.redirect("/index.html");
                }
            }
        });
    },
    queryOneUser(req, resp) {
        let id = req.body.Id;
        let username = req.body.userName;

        let userArr = [id, username];
        userDao.queryOneDB(userArr, function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    let queryData = JSON.stringify(data);
                    console.log("queryOneUser" + queryData);
                    queryData = queryData.replace(/id/g, "用户ID");
                    queryData = queryData.replace(/username/g, "用户名");
                    queryData = queryData.replace(/password/g, "用户密码");
                    queryData = queryData.replace(/message/g, "用户信息");
                    resp.send(queryData);
                }
            }
        });
    },
    getUserDataUser(req, resp) {
        let sql = "SELECT id,username,password,message FROM user order by id";
        userDao.UserDao(sql, [], function (err, data) {
            if (data.length > 0) {
                // 在这里修改数据
                let queryData = JSON.stringify(data);
                console.log("getUserData#2" + queryData);
                queryData = queryData.replace(/id/g, "用户ID");
                queryData = queryData.replace(/username/g, "用户名");
                queryData = queryData.replace(/password/g, "用户密码");
                queryData = queryData.replace(/message/g, "用户信息");
                resp.send(queryData);
            }
        });
    },
    getPageUser(req, resp) {
        let sql = "select count(*) as 'pageNum' from user";
        userDao.UserDao(sql, [], function (err, data) {
            if (data) {
                resp.send(data);
            }
        });
    },
    getPageDataUser(req, resp) {
        let { pageNum, pageDataNum } = req.body;
        let arr = [];
        pageNum = (pageNum - 1) * pageDataNum;
        arr.push(pageNum);
        arr.push(Number(pageDataNum));
        let sql = "SELECT id,username,password,message FROM user order by id limit ?,?";
        userDao.UserDao(sql, arr, function (err, data) {
            if (data) {
                let queryData = JSON.stringify(data);
                console.log("getPageData#4" + queryData);
                queryData = queryData.replace(/id/g, "用户ID");
                queryData = queryData.replace(/username/g, "用户名");
                queryData = queryData.replace(/password/g, "用户密码");
                queryData = queryData.replace(/message/g, "用户信息");
                resp.send(queryData);
            }
        })
    },
    delUserPost(req, resp) {
        let { userId } = req.body;
        console.log("delUserPost#1" + userId);
        let sql = "DELETE FROM user WHERE id = ?";
        userDao.UserDao(sql, userId, function (err, data) {
            if (data) {
                resp.send("1");
            }
        });
    }
}