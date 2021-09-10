const parkDao = require("../dao/parkDao");

module.exports = {
    addPark: (req, resp) => {
        let localid = req.body.localId;
        let thepark = req.body.thePark;
        let localdesc = req.body.localDesc;

        let parkArr = [localid, thepark, localdesc];
        console.log("addPark#1" + parkArr);
        parkDao.addDB(parkArr, function (err, data) {
            console.log("addPark#2" + data);
            if (err) {
                console.log("addPark#3" + err);
                return;
            } else {
                if (data) {
                    resp.redirect("/page/park.html");
                }
                else {
                    resp.send("添加失败!");
                }
            }
        });
    },
    updatePark: (req, resp) => {
        let localid = req.body.localId;
        let thepark = req.body.thePark;
        let localdesc = req.body.localDesc;

        let parkArr = [thepark, localdesc, localid];
        console.log("updatePark#1" + parkArr);
        parkDao.updateDB(parkArr, function (err, data) {
            console.log("updatePark#2" + data);
            if (err) {
                console.log("updatePark#3" + err);
                return;
            } else {
                if (data) {
                    resp.redirect("/page/park.html");
                }
                else {
                    resp.send("修改失败!");
                }
            }
        });
    },
    queryPark: (req, resp) => {
        parkDao.queryDB(function (err, data) {
            if (err) {
                console.log("queryPark#1" + err);
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
    queryOnePark(req, resp) {
        let localid = req.body.localId;
        let thepark = req.body.thePark;

        let parkArr = [localid, thepark];
        console.log("queryOnePark#1" + parkArr);
        parkDao.queryOneDB(parkArr, function (err, data) {
            if (err) {
                console.log("queryOnePark#2" + err);
                return;
            } else {
                if (data) {
                    let queryData = JSON.stringify(data);
                    console.log("queryOnePark" + queryData);
                    queryData = queryData.replace(/localid/g, "园区ID");
                    queryData = queryData.replace(/thepark/g, "园区名");
                    queryData = queryData.replace(/localdesc/g, "园区信息");
                    resp.send(queryData);
                }
            }
        });
    },
    getParkDataPark(req, resp) {
        let sql = "SELECT localid,thepark,localdesc FROM park order by localid";
        parkDao.ParkDao(sql, [], function (err, data) {
            console.log("getParkData#1" + data);
            if (data.length > 0) {
                // 在这里修改数据
                let queryData = JSON.stringify(data);
                console.log("getParkData#2" + queryData);
                queryData = queryData.replace(/localid/g, "园区ID");
                queryData = queryData.replace(/thepark/g, "园区名");
                queryData = queryData.replace(/localdesc/g, "园区信息");
                resp.send(queryData);
            }
        });
    },
    getPagePark(req, resp) {
        let sql = "select count(*) as 'pageNum' from park";
        parkDao.ParkDao(sql, [], function (err, data) {
            console.log("getPage#1" + data);
            if (data) {
                resp.send(data);
            }
        });
    },
    getPageDataPark(req, resp) {
        let { pageNum, pageDataNum } = req.body;
        let arr = [];
        pageNum = (pageNum - 1) * pageDataNum;
        arr.push(pageNum);
        arr.push(Number(pageDataNum));
        console.log("getPageData#1" + arr);
        let sql = "SELECT localid,thepark,localdesc FROM park order by localid limit ?,?";
        parkDao.ParkDao(sql, arr, function (err, data) {
            console.log("getPageData#2" + data);
            console.log("getPageData#3" + err);
            if (data) {
                let queryData = JSON.stringify(data);
                console.log("getPageData#4" + queryData);
                queryData = queryData.replace(/localid/g, "园区ID");
                queryData = queryData.replace(/thepark/g, "园区名");
                queryData = queryData.replace(/localdesc/g, "园区信息");
                resp.send(queryData);
            }
        })
    },
    delParkPost(req, resp) {
        let { localId } = req.body;
        console.log("delParkPost#1" + localId);
        let sql = "DELETE FROM park WHERE localid = ?";
        parkDao.ParkDao(sql, localId, function (err, data) {
            console.log("delParkPost#2" + err);
            console.log("delParkPost#3" + data);
            if (data) {
                resp.send("1");
            }
        });
    }
}