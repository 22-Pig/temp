const dbPool = require("../config/poolConfig");

module.exports = {
    UserDao(sql, arr, cb) {
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    updateDB(arr, cb) {
        const sql = "UPDATE user SET username = ?, password = ?, message = ? WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    addDB(arr, cb) {
        // 1、调用sql SELECT max(id) + 1 AS id FROM user;
        dbPool.connect('SELECT max(id) + 1 AS id FROM user', [], function (err, data) {
            if (err) {
                cb(err, data);
            }
            else {
                console.log(data);
                arr[0] = data[0].id;
                const sql = "INSERT INTO user VALUES (?,?,?,?)";
                console.log(arr);
                dbPool.connect(sql, arr, function (err1, data1) {
                    cb(err1, data1);
                });
            }
        });
    },
    queryDB(arr, cb) {
        const sql = "SELECT * FROM user";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    queryOneDB(arr, cb) {
        const sql = "SELECT * FROM user WHERE id = ? OR username = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
}