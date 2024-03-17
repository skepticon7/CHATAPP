const express = require("express");
const router = express.Router();
const GetUsers = require("../CONTROLLERS/user.controller");
const ProtectRoute = require("../MIDDLWARE/ProtectionMiddlware");

router.get("/getusers",ProtectRoute,GetUsers);
module.exports = router;