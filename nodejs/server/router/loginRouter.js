const express = require("express");
const loginCtrl = require("../controller/loginCtrl");
const router = express.Router();

router.post("/login", loginCtrl.login);

router.post("/loginApp", loginCtrl.login);
module.exports = router;