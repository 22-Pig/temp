// 拦截请求，分发任务
const express = require("express");
const deviceCtrl = require("../controller/deviceCtrl");
const router = express.Router();

// 新增数据
router.post("/addDev",deviceCtrl.addDev);

// 删除指定行的信息
router.post("/deleteDev",deviceCtrl.deleteDev);

// 确定修改
router.post("/updateDev",deviceCtrl.updateDev);

// 查询单个
router.get("/searchDev/:id",deviceCtrl.searchDev);

// 查询所有
router.get("/searchAllDev",deviceCtrl.searchAllDev);

module.exports = router;