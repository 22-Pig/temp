const dbPool = require("../config/poolConfig");

module.exports = {
    operateDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getTempDB(arr, cb) {
        var sql = "select * from hardware_temp WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getHumdDB(arr, cb) {
        var sql = "select * from hardware_humd WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getInfraredDB(arr, cb) {
        var sql = "select * from hardware_infrared WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getMotordDB(arr, cb) {
        var sql = "select * from hardware_motor WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
}