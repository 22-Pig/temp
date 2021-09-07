const deviceDao = require("../dao/deviceDao");

module.exports = {
    addDev: (req, resp) => {
        console.log(req.body);
        let id = req.body.id;
        let type = req.body.type;
        let name = req.body.name;
        let value = req.body.value;
        if (value.length == 0) {
            value = 0;
        }
        let descr = req.body.descr;
        let deviceArr = [id, type, name, value, descr];
        deviceDao.addDevDB(deviceArr, function (err, data) {
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
    deleteDev: (req, resp) => {
        let devId = req.body.did;
        console.log(devId);
        deviceDao.deleteDevDB(devId, function (err, data) {
            if (data) {
                resp.send({ succ: true });
            }
        });
    },
    updateDev: (req, resp) => {
        let id = req.body.id;
        let type = req.body.type;
        let name = req.body.name;
        let descr = req.body.descr;
        let deviceArr = [type, name, descr, id];
        deviceDao.updateDevDB(deviceArr, function (err, data) {
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
    searchDev: (req, resp) => {
        let id = req.params.id;
        let deviceArr = [id];
        deviceDao.searchDevDB(deviceArr, function (err, data) {
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
    searchAllDev: (req, resp) => {
        deviceDao.searchAllDevDB(function (err, data) {
            if (err) {
                return;
            } else {
                if (data) {
                    resp.send(data);
                    console.log(data);
                } else {
                }
            }
        });
    }

}