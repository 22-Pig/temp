// 拦截请求，分发任务
const express = require("express");
const userCtrl = require("../controller/userCtrl");
const router = express.Router();

// 新增数据
router.post("/addUser",userCtrl.addUser);

// 删除指定行的信息
router.post("/deleteUser",userCtrl.deleteUser);

// 确定修改
router.post("/updateUser",userCtrl.updateUser);

// 查询单个
router.get("/searchUser/:username",userCtrl.searchUser);

// 查询所有
router.get("/searchAllUser",userCtrl.searchAllUser);

module.exports = router;