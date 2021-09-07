const dbPool = require("../config/poolConfig");

module.exports = {
    addDevDB(arr, cb) {
        dbPool.connect('SELECT max(id) + 1 AS id FROM device', [], function (err, data) {
            if (err) {
                cb(err, data);
            }
            else {
                console.log(data);
                arr[0] = data[0].id;
                const sql = "INSERT INTO device VALUES (?,?,?,?,?)";
                console.log(arr);
                dbPool.connect(sql, arr, function (err, data) {
                    cb(err, data);
                });
            }
        });
    },
    deleteDevDB(arr, cb) {
        const sql = "DELETE FROM device WHERE id = ?";
        dbPool.connect(sql, arr, (err, data) => {
            cb(err, data);
        });
    },
    updateDevDB(arr, cb) {
        const sql = "UPDATE device SET type = ?, name = ?, descr = ? WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    searchDevDB(arr, cb) {
        const sql = "SELECT * FROM device WHERE id = ?";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    },
    searchAllDevDB(arr, cb) {
        const sql = "SELECT * FROM device";
        dbPool.connect(sql, arr, function (err, data) {
            cb(err, data);
        });
    }
}