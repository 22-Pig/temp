const hardwareDao = require("../dao/hardwareDao");

var tempsql = '';
var humdsql = '';
var infraredsql = '';
var motorsql = '';

module.exports = {
    hardware: function (req, resp) {
        // console.log(req.body);
        let tp = "hardware_temp";
        let hd = "hardware_humd";
        let led_value = 0;
        let motor_value = 0;
        // var today = getFormattedDate();
        // console.log(data);
        const temp = req.body.temp;
        const humd = req.body.humd;
        const infrared = req.body.infrared;
        console.log('temp:' + temp);
        console.log('humd:' + humd);
        tempsql = 'INSERT INTO hardware_temp values(\'' + tp + '\', ' + Date.now() + ',' + temp + ')';
        insert(tempsql);
        humdsql = 'INSERT INTO hardware_humd values(\'' + hd + '\', ' + Date.now() + ',' + humd + ')';
        insert(humdsql);
        if (temp >= 28 && humd >= 35) {
            motor_value = 1;
            motorsql = "UPDATE hardware_motor SET motor = 1 WHERE id = \'motor\'";
            update(motorsql);
            console.log('电机开');
        }
        else if (temp < 28 || humd < 35) {
            motor_value = 0;
            motorsql = "UPDATE hardware_motor SET motor = 0 WHERE id = \'motor\'";
            update(motorsql);
            console.log('电机关');
        }
        if (infrared == 1) {
            led_value = 1;
            infraredsql = "UPDATE hardware_infrared SET infrared = 1 WHERE id = \'infrared\'";
            update(infraredsql);
            console.log('灯开');
        }
        else {
            led_value = 0;
            infraredsql = "UPDATE hardware_infrared SET infrared = 0 WHERE id = \'infrared\'";
            update(infraredsql);
            console.log('灯关');
        }
        resp.send(
            {
                "Temperature": temp,
                "Humidity": humd,
                "LED_status": led_value,
                "Motor_status": motor_value,
            }
        );
    },
    getTemp: function (req, resp) {
        let id = "hardware_temp";
        hardwareDao.getTempDB(id, function (err, data) {
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
        let id = "hardware_humd";
        hardwareDao.getHumdDB(id, function (err, data) {
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
    getInfrared: function (req, resp) {
        let id = "infrared";
        hardwareDao.getInfraredDB(id, function (err, data) {
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
    getMotor: function (req, resp) {
        let id = "motor";
        hardwareDao.getMotordDB(id, function (err, data) {
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
    }
}

function insert(sql) {
    hardwareDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}

function update(sql) {
    hardwareDao.operateDB(sql, [], function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
    });
}
