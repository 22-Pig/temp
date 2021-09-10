const dbPool = require("../config/poolConfig");

module.exports = {
    ParkDao(sql, arr, cb) {
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    ParkSearchDao(sql, arr, cb) {
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    updateDB(arr, cb) {
        const sql = "UPDATE park SET thepark = ?, localdesc = ? WHERE localid = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    addDB(arr, cb) {
        // 1、调用sql SELECT max(localid) + 1 AS localid FROM park;
        dbPool.connect('SELECT max(localid) + 1 AS localid FROM park', [], function (err, data) {
            if (err) {
                cb(err, data);
            }
            else {
                console.log(data);
                arr[0] = data[0].localid;
                const sql = "INSERT INTO park VALUES (?,?,?)";
                console.log(arr);
                dbPool.connect(sql, arr, function (err1, data1) {
                    cb(err1, data1);
                });
            }
        });
    },
    queryDB(arr, cb) {
        const sql = "SELECT * FROM park";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    queryOneDB(arr, cb) {
        const sql = "SELECT * FROM park WHERE localid = ? OR thepark = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
}