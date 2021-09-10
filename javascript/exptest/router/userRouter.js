// 拦截请求，分发任务
const express = require("express");
const userCtrl = require("../controller/userCtrl");
const router = express.Router();
// 查询单个
router.post("/queryOneUser.do", userCtrl.queryOneUser);

// 查询所有
router.post("/queryUser.do", userCtrl.queryUser);

// 新增数据
router.post("/addUser.do", userCtrl.addUser);

// 确定修改
router.post("/updateUser.do", userCtrl.updateUser);

// 删除指定行的信息
router.post("/delUserPost.do", userCtrl.delUserPost);

// 获取所有数据的方法
router.get("/ajaxGetDataUser.do", userCtrl.getUserDataUser);

// 请求一共有多少页的方法
router.post("/getPageUser.do", userCtrl.getPageUser);

// 点击第几页就显示第几页的数据
router.post("/getPageDataUser.do", userCtrl.getPageDataUser);

module.exports = router;