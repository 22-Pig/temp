const express = require("express");
const infoCtrl = require("../controller/infoCtrl");
const router = express.Router();

// PT上报数据
router.post("/report", infoCtrl.report);

router.get('/temp/:id', infoCtrl.getTemp);
router.get('/humd/:id', infoCtrl.getHumd);
router.get('/smoke/:id', infoCtrl.getSmoke);
router.get('/NH3/:id', infoCtrl.getNH3);
router.get('/H2S/:id', infoCtrl.getH2S);


router.get("/infos", infoCtrl.info);
router.get("/getMot", infoCtrl.getMot);

router.post("/toggle", infoCtrl.toggle);

router.get("/getLed", infoCtrl.getLed);
module.exports = router;