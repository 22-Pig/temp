// 拦截请求，分发任务
const express = require("express");
const deviceCtrl = require("../controller/deviceCtrl");
const router = express.Router();
// 查询单个
router.post("/queryOneDevice.do", deviceCtrl.queryOneDevice);

// 查询所有
router.post("/queryDevice.do", deviceCtrl.queryDevice);

// 新增数据
router.post("/addDevice.do", deviceCtrl.addDevice);

// 确定修改
router.post("/updateDevice.do", deviceCtrl.updateDevice);

// 多条件搜素
router.post("/searchDev.do", deviceCtrl.searchDev);

// 删除指定行的信息
router.post("/delDevPost.do", deviceCtrl.delDevicePost);

// 获取所有数据的方法
router.get("/ajaxGetData.do", deviceCtrl.getDevData);

// 请求一共有多少页的方法
router.post("/getPage.do", deviceCtrl.getPage);

// 点击第几页就显示第几页的数据
router.post("/getPageData.do", deviceCtrl.getPageData);

module.exports = router;