const iot = require('alibabacloud-iot-device-sdk');
const infoDao = require("../dao/infoDao");

var list = [];
var aliptData = [];
var updateValue = '';

module.exports = {
    //存放对象
    list: list,

    getAliptConection: () => {
        getAliptData();
    }
}

function getAliptData() {
    infoDao.aliptDB([], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        else {
            if (data) {
                data = JSON.stringify(data);
                data = JSON.parse(data);
                aliptData = data;
                for (var i = 0; i < aliptData.length; i++) {
                    register(data[i]);
                }
            }
        }
    });
}

function register(data) {
    //创建对象
    const device = iot.device(data);

    //监听connect事件
    device.on('connect', () => {
        device.subscribe('/' + data.ProductKey + '/' + data.DeviceName + '/user/get');
        console.log(data.DeviceName + ' connect successfully!');
        // 发送消息到某个主题
        // device.publish('/' + data.ProductKey + '/' + data.DeviceName + '/user/update', 'hello world!');
    });

    //监听message事件
    device.on('message', (topic, payload) => {
        if (JSON.parse(payload.toString()).code != 200) {
            console.log(topic + ": " + payload.toString());
            // console.log(topic.slice());
        }
    });

    // 监听云端设置属性服务消息
    device.onProps((cmd) => {
        console.log('>>>onProps', cmd); //打印完整的属性设置消息
        // for (var key in cmd.params) {
        if (data.type == 'fan') {
            updateValue = Number(cmd.params.PowerSwitch);
            device.postProps({ PowerSwitch: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'window') {
            updateValue = Number(cmd.params.WorkSwitch);
            device.postProps({ WorkSwitch: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'sprinkler') {
            updateValue = Number(cmd.params.WorkSwitch);
            device.postProps({ WorkSwitch: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'mot') {
            updateValue = Number(cmd.params.MotionAlarmState);
            device.postProps({ MotionAlarmState: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'door') {
            updateValue = Number(cmd.params.Lock_control);
            device.postProps({ Lock_status: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'led') {
            updateValue = Number(cmd.params.LightSwitch);
            device.postProps({ LightSwitch: updateValue });
            update(updateValue, data.id);
        }
        if (data.type == 'flush') {
            updateValue = Number(cmd.params.WorkSwitch);
            device.postProps({ WorkSwitch: updateValue });
            update(updateValue, data.id);
        }
        // }
    });

    //产生的对象插入数组
    list.push(device);
}

function update(value, id) {
    sql = 'UPDATE alipt SET value = ' + value + ' WHERE id = \'' + id + '\'';
    infoDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}