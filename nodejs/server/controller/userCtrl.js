const userDao = require("../dao/userDao");

module.exports = {
    addUser: (req, resp) => {
        let id = req.body.id;
        let username = req.body.username;
        let password = req.body.password;
        let message = req.body.message;
        let userArr = [id, username, password, message];
        userDao.addUserDB(userArr, function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.send({ succ: true });
                }
                else {
                    resp.send({ succ: false });
                }
            }
        });
    },
    deleteUser: (req, resp) => {
        let username = req.body.username;
        userDao.deleteUserDB(username, function (err, data) {
            if (data) {
                resp.send({ succ: true });
            }
        });
    },
    updateUser(req, resp) {
        let id = req.body.id;
        let password = req.body.password;
        let message = req.body.message;
        let username = req.body.username;
        let userArr = [id, password, message, username];
        userDao.updateUserDB(userArr, function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                if (data) {
                    resp.send({ succ: true });
                }
                else {
                    resp.send({ succ: false });
                }
            }
        });
    },
    searchUser(req, resp) {
        let username = req.params.username;
        let userArr = [username];
        console.log(username);
        userDao.searchUserDB(userArr, function (err, data) {
            if (err) {
                console.log(err);
                return;
            } else {
                if (data) {
                    let queryData = JSON.stringify(data);
                    resp.send(queryData);
                }
            }
        });
    },
    searchAllUser: (req, resp) => {
        userDao.searchAllUserDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.send(data);
                } else {
                }
            }
        });
    }

}