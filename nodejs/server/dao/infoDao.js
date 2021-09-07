const dbPool = require("../config/poolConfig");

module.exports = {
    aliptDB(arr, cb) {
        let sql = 'SELECT * FROM alipt';
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    updateAliptDB(arr, cb) {
        const sql = "UPDATE alipt SET value = ? WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getTempDB(arr, cb) {
        var sql = "select * from temp WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getHumdDB(arr, cb) {
        var sql = "select * from humd WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getSmokeDB(arr, cb) {
        var sql = "select * from smoke WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getNH3DB(arr, cb) {
        var sql = "select * from nh3 WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    getH2SDB(arr, cb) {
        var sql = "select * from h2s WHERE id = ? order by time desc limit 5";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    reportDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    operateDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    infoDB(arr, cb) {
        const sql = "SELECT * FROM alipt";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    operateDB(sql, arr, cb) {
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    }
}