// 拦截请求，分发任务
const express = require("express");
const parkCtrl = require("../controller/parkCtrl");
const router = express.Router();
// 查询单个
router.post("/queryOnePark.do", parkCtrl.queryOnePark);

// 查询所有
router.post("/queryPark.do", parkCtrl.queryPark);

// 新增数据
router.post("/addPark.do", parkCtrl.addPark);

// 确定修改
router.post("/updatePark.do", parkCtrl.updatePark);

// 删除指定行的信息
router.post("/delParkPost.do", parkCtrl.delParkPost);

// 获取所有数据的方法
router.get("/ajaxGetDataPark.do", parkCtrl.getParkDataPark);

// 请求一共有多少页的方法
router.post("/getPagePark.do", parkCtrl.getPagePark);

// 点击第几页就显示第几页的数据
router.post("/getPageDataPark.do", parkCtrl.getPageDataPark);

module.exports = router;