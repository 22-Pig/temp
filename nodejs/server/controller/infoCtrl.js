const infoDao = require("../dao/infoDao");
const aliyun = require("../service/aliyun");

var reportsql = '';
var updatesql = '';
var typeValue = [];
var sql = '';
var reportValue = '';
var respData = null;

var sql = '';
var typeValue = [];

module.exports = {
    report: async function (req, resp) {
        var data = JSON.parse(req.body.data);
        var respDataArr = [];
        respDataArr.length = 0;
        for (var i = 0; i < data.length; i++) {
            // console.log(data[i]);
            sendAli(data[i]);
            // console.log(data[i].type);
            if (data[i].type == "Temp") {
                var callId = data[i].id;
                reportsql = 'INSERT INTO temp values(\'' + data[i].id + '\', ' + Date.now() + ',' + data[i].value + ')';
                report(reportsql);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                respData = {
                    id: callId,
                    success: true
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "Humd") {
                var callId = data[i].id;
                reportsql = 'INSERT INTO humd values(\'' + data[i].id + '\', ' + Date.now() + ',' + data[i].value + ')';
                report(reportsql);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                respData = {
                    id: callId,
                    success: true
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "Smoke") {
                var callId = data[i].id;
                reportsql = 'INSERT INTO smoke values(\'' + data[i].id + '\', ' + Date.now() + ',' + data[i].value + ')';
                report(reportsql);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                respData = {
                    id: callId,
                    success: true
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "NH3") {
                var callId = data[i].id;
                reportsql = 'INSERT INTO nh3 values(\'' + data[i].id + '\', ' + Date.now() + ',' + data[i].value + ')';
                report(reportsql);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                respData = {
                    id: callId,
                    success: true
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "H2S") {
                var callId = data[i].id;
                reportsql = 'INSERT INTO h2s values(\'' + data[i].id + '\', ' + Date.now() + ',' + data[i].value + ')';
                report(reportsql);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                respData = {
                    id: callId,
                    success: true
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "fan") {
                var callId = data[i].id;
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    fanStatus: reportValue
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "window") {
                var callId = data[i].id;
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    windowStatus: reportValue
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "sprinkler") {
                var callId = data[i].id;
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    sprinklerStatus: reportValue
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "mot") {
                var callId = data[i].id;
                // console.log(callId + ":" + data[i].value);
                updatesql = 'UPDATE alipt SET value = ' + data[i].value + ' WHERE id = \'' + data[i].id + '\'';
                update(updatesql);
                /* await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    motStatus: reportValue
                }
                respDataArr.push(respData); */
                // resp.send(respData);
            }
            if (data[i].type == "door") {
                var callId = data[i].id;
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    doorStatus: reportValue
                }
                respDataArr.push(respData);
                // resp.send(respData);
            }
            if (data[i].type == "led") {
                var callId = data[i].id;
                // console.log(callId);
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    ledStatus: reportValue
                }
                respDataArr.push(respData);
            }
            if (data[i].type == "flush") {
                var callId = data[i].id;
                await getValue(callId);
                respData = {
                    id: callId,
                    success: true,
                    flushStatus: reportValue
                }
                respDataArr.push(respData);
            }
        }
        resp.send(JSON.stringify(respDataArr));
        // resp.end();
        // 发送消息到阿里云   
    },
    getTemp: function (req, resp) {
        const id = req.params.id;
        // console.log('getTemp：' + id);
        infoDao.getTempDB(id, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    getHumd: function (req, resp) {
        const id = req.params.id;
        // console.log('getHumd：' + id);
        infoDao.getHumdDB(id, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    getSmoke: function (req, resp) {
        const id = req.params.id;
        // console.log('getSmoke：' + id);
        infoDao.getSmokeDB(id, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    getNH3: function (req, resp) {
        const id = req.params.id;
        // console.log('getNH3：' + id);
        infoDao.getNH3DB(id, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    getH2S: function (req, resp) {
        const id = req.params.id;
        // console.log('getH2S：' + id);
        infoDao.getH2SDB(id, function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    resp.send(JSON.stringify(data));
                }
            }
        });
    },
    info: (req, resp) => {
        infoDao.infoDB(function (err, data) {
            if (err) {
                return;
            }
            else {
                if (data) {
                    resp.send(data);
                } else {
                }
            }
        });
    },
    getMot: (req, resp) => {
        var type = "mot";
        getTypeValue(type);
        for (var j = 0; j < typeValue.length; j++) {
            id = typeValue[j].id;
            value = typeValue[j].value;
            if (id == "mot_101") {
                var motstatus_101 = value;
            }
            if (id == "mot_102") {
                var motstatus_102 = value;
            }
        }
        const data = {
            motstatus_101: motstatus_101,
            motstatus_102: motstatus_102
        }
        resp.send(data);
    },
    toggle: function (req, resp) {
        var toggleId = req.body.id;
        var status = req.body.status;
        // console.log(toggleId);
        // console.log(status);
        updateValue(status, toggleId);
        resp.send({
            success: true,
            data: {
                id: toggleId,
                value: status
            }
        });
    },
    getLed: async (req, resp) => {
        var type = "led";
        await getTypeValue(type);
        for (var j = 0; j < typeValue.length; j++) {
            id = typeValue[j].id;
            value = typeValue[j].value;
            console.log(id);
            if (id == "led_101") {
                var ledstatus_101 = value;
            }
            if (id == "led_102") {
                var ledstatus_102 = value;
            }
            if (id == "led_001") {
                var ledstatus_001 = value;
            }
            if (id == "led_002") {
                var ledstatus_002 = value;
            }
        }
        const data = {
            ledstatus_101: ledstatus_101,
            ledstatus_102: ledstatus_102,
            ledstatus_001: ledstatus_001,
            ledstatus_002: ledstatus_002,
        }
        console.log(data);
        resp.send(data);
    },
}

function sendAli(data) {
    for (var i of aliyun.list) {
        // console.log(i);
        // 温度上报
        if (i.model.config.type == "Temp") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    CurrentTemperature: data.value
                })
            }
        }
        // 湿度上报
        if (i.model.config.type == "Humd") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    CurrentHumidity: data.value
                })
            }
        }
        // 二氧化碳上报
        if (i.model.config.type == "Smoke") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    CO2Value: data.value
                })
            }
        }
        // NH3上报
        if (i.model.config.type == "NH3") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    NH3: data.value
                })
            }
        }
        // H2S上报
        if (i.model.config.type == "H2S") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    SO2: data.value
                })
            }
        }
        // fan上报
        if (i.model.config.type == "fan") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    PowerSwitch: data.value
                })
            }
        }
        // window上报
        if (i.model.config.type == "window") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    WorkSwitch: data.value
                })
            }
        }
        // sprinkler上报
        if (i.model.config.type == "sprinkler") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    WorkSwitch: data.value
                })
            }
        }
        // mot上报
        if (i.model.config.type == "mot") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    MotionAlarmState: data.value
                })
            }
        }
        // door上报
        if (i.model.config.type == "door") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    Lock_control: data.value
                })
            }
        }
        // led上报
        if (i.model.config.type == "led") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    LightSwitch: data.value
                })
            }
        }
        // flush上报
        if (i.model.config.type == "flush") {
            if (i.model.config.id == data.id) {
                i.postProps({
                    WorkSwitch: data.value
                })
            }
        }
    }
}

// 上报数据库(type表)
function report(sql) {
    infoDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

// 更新数据库(alipt表)
function update(sql) {
    infoDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

// 查询数据库值callback -> PT
function getValue(id) {
    return new Promise(resolve => {
        sql = 'SELECT value FROM alipt WHERE id = \'' + id + '\'';
        infoDao.operateDB(sql, [], function (err, data) {
            if (err) {
                console.log(err);
            }
            else {
                if (data) {
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    // console.log(data);
                    reportValue = data[0].value;
                    // console.log(reportValue);
                    resolve('success')
                }
            }
        });
    })

}

function getTypeValue(type) {
    return new Promise(resolve => {
        sql = 'SELECT * FROM alipt WHERE type = \'' + type + '\'';
        infoDao.operateDB(sql, [], function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            else {
                if (data) {
                    data = JSON.stringify(data);
                    data = JSON.parse(data);
                    typeValue.length = 0;
                    for (var i = 0; i < data.length; i++) {
                        typeValue.push(data[i])
                    }
                    resolve('success');
                    // console.log(typeValue);
                }
            }
        });
    })
}

function updateValue(value, id) {
    sql = 'UPDATE alipt SET value = ' + value + ' WHERE id = \'' + id + '\'';
    infoDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}