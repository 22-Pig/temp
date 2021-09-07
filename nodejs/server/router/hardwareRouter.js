const express = require("express");
const hardwareCtrl = require("../controller/hardwareCtrl");
const router = express.Router();

// ESP8266上报数据
router.post("/hardware", hardwareCtrl.hardware);

router.get('/hardwaretemp', hardwareCtrl.getTemp);

router.get('/hardwarehumd', hardwareCtrl.getHumd);

router.get('/getInfrared', hardwareCtrl.getInfrared);

router.get('/getMotor', hardwareCtrl.getMotor);

module.exports = router;