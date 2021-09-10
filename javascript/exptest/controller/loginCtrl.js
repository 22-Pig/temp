const loginDao = require("../dao/loginDao");

module.exports = {

    login: (req, resp) => {
        let username = req.body.userName;
        let password = req.body.passWord;

        let loginArr = [username, password];
        console.log("loginArr#1" + loginArr);

        loginDao.loginDB(loginArr, function (err, data) {
            if (err) {
                console.log("login#1" + err);
                return;
            }
            else {
                console.log("loginCtrl:" + data.length);
                if (data.length == 1) {
                    resp.redirect("/page/management.html");
                } else {
                    resp.redirect("/page/login.html");
                }
            }
        });
    },
}