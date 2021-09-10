const deviceDao = require("../dao/deviceDao");

module.exports = {
    addDevice: (req, resp) => {
        let id = req.body.equId;
        let name = req.body.equName;
        let value = req.body.equValue;
        let message = req.body.equMessage;

        let deviceArr = [id, name, value, message];
        console.log("addDevice#1" + deviceArr);
        deviceDao.addDB(deviceArr, function (err, data) {
            console.log("addDevice#2" + data);
            if (err) {
                console.log("addDevice#3" + err);
                return;
            } else {
                if (data) {
                    resp.redirect("/page/device.html");
                }
                else {
                    resp.send("添加失败!");
                }
            }
        });
    },
    updateDevice: (req, resp) => {
        let id = req.body.equId;
        let name = req.body.equName;
        let value = req.body.equValue;
        let message = req.body.equMessage;

        let deviceArr = [name, value, message, id];
        console.log("updateDevice#1" + deviceArr);
        deviceDao.updateDB(deviceArr, function (err, data) {
            console.log("updateDevice#2" + data);
            if (err) {
                console.log("updateDevice#3" + err);
                return;
            } else {
                if (data) {
                    resp.redirect("/page/device.html");
                }
                else {
                    resp.send("修改失败!");
                }
            }
        });
    },
    queryDevice: (req, resp) => {
        deviceDao.queryDB(function (err, data) {
            if (err) {
                console.log("queryDevice#1" + err);
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
    queryOneDevice(req, resp) {
        let id = req.body.equId;
        let name = req.body.equName;

        let deviceArr = [id, name];
        console.log("queryOneDevice#1" + deviceArr);
        deviceDao.queryOneDB(deviceArr, function (err, data) {
            if (err) {
                console.log("queryOneDevice#2" + err);
                return;
            } else {
                if (data) {
                    let queryData = JSON.stringify(data);
                    console.log("queryOneDevice" + queryData);
                    queryData = queryData.replace(/id/g, "设备ID");
                    queryData = queryData.replace(/name/g, "设备名");
                    queryData = queryData.replace(/value/g, "设备值");
                    queryData = queryData.replace(/message/g, "设备信息");
                    queryData = queryData.replace(/thepark/g, "园区名");
                    queryData = queryData.replace(/localdesc/g, "园区位置");
                    resp.send(queryData);
                }
            }
        });
    },
    getDevData(req, resp) {
        let sql = "SELECT device.id,device.name,device.value,device.message,park.thepark,park.localdesc FROM device INNER JOIN park ON device.message = park.localid order by id";
        deviceDao.DevDao(sql, [], function (err, data) {
            console.log("getDevData#1" + data);
            if (data.length > 0) {
                // 在这里修改数据
                let queryData = JSON.stringify(data);
                console.log("getDevData#2" + queryData);
                queryData = queryData.replace(/id/g, "设备ID");
                queryData = queryData.replace(/name/g, "设备名");
                queryData = queryData.replace(/value/g, "设备值");
                queryData = queryData.replace(/message/g, "设备信息");
                queryData = queryData.replace(/thepark/g, "园区名");
                queryData = queryData.replace(/localdesc/g, "园区位置");
                resp.send(queryData);
            }
        });
    },
    getPage(req, resp) {
        let sql = "select count(*) as 'pageNum' from device";
        deviceDao.DevDao(sql, [], function (err, data) {
            console.log("getPage#1" + data);
            if (data) {
                resp.send(data);
            }
        });
    },
    getPageData(req, resp) {
        let { pageNum, pageDataNum } = req.body;
        let arr = [];
        pageNum = (pageNum - 1) * pageDataNum;
        arr.push(pageNum);
        arr.push(Number(pageDataNum));
        console.log("getPageData#1" + arr);
        let sql = "SELECT device.id,device.name,device.value,device.message,park.thepark,park.localdesc FROM device INNER JOIN park ON device.message = park.localid order by id limit ?,?";
        deviceDao.DevDao(sql, arr, function (err, data) {
            console.log("getPageData#2" + data);
            console.log("getPageData#3" + err);
            if (data) {
                let queryData = JSON.stringify(data);
                console.log("getPageData#4" + queryData);
                queryData = queryData.replace(/id/g, "设备ID");
                queryData = queryData.replace(/name/g, "设备名");
                queryData = queryData.replace(/value/g, "设备值");
                queryData = queryData.replace(/message/g, "设备信息");
                queryData = queryData.replace(/thepark/g, "园区名");
                queryData = queryData.replace(/localdesc/g, "园区位置");
                resp.send(queryData);
            }
        })
    },
    delDevicePost(req, resp) {
        let { devId } = req.body;
        console.log("delDevicePost#1" + devId);
        let sql = "DELETE FROM device WHERE id = ?";
        deviceDao.DevDao(sql, devId, function (err, data) {
            console.log("delDevicePost#2" + err);
            console.log("delDevicePost#3" + data);
            if (data) {
                resp.send("1");
            }
        });
    },
    searchDev(req, resp) {
        // console.log("searchDev#1" + req.body);
        let { devName, devValue, devMessage } = req.body //变量对对象的解构赋值
        let arr = [];
        let sql = "SELECT device.id,device.name,device.value,device.message,park.thepark,park.localdesc FROM device INNER JOIN park ON device.message = park.localid where 1=1";
        let order = "order by id";
        if (devName != "") {
            devName = devName + '%';
            sql = `${sql} and name like ? `;
            arr.push(devName);
        }
        if (devValue != "") {
            sql = `${sql} and value >= ? `;
            arr.push(devValue);
        }
        if (devMessage != "") {
            sql = `${sql} and message = ? `;
            arr.push(devMessage);
        }
        sql = sql + order;
        console.log("searchDev#2" + sql);
        if (devName & devValue & devMessage == "") {
            sql = "SELECT * FROM device";
        }
        deviceDao.DevSearchDao(sql, arr, (err, data) => {
            console.log("searchDev" + data);
            console.log("searchDev#3" + data);
            console.log("searchDev#4" + err);
            if (data) {
                let queryData = JSON.stringify(data);
                console.log("searchDev" + queryData);
                queryData = queryData.replace(/id/g, "设备ID");
                queryData = queryData.replace(/name/g, "设备名");
                queryData = queryData.replace(/value/g, "设备值");
                queryData = queryData.replace(/message/g, "设备信息");
                queryData = queryData.replace(/thepark/g, "园区名");
                queryData = queryData.replace(/localdesc/g, "园区位置");
                resp.send(queryData);
            }
        });
        console.log("searchDev#5" + devName, devValue, devMessage);
    },
}