
const {SendMessage , getMessage} = require("../CONTROLLERS/message.contoller");
const ProtectionRoute = require("../MIDDLWARE/ProtectionMiddlware");
const express = require("express");
const router = express.Router();


router.post("/SendMessages",ProtectionRoute,SendMessage);
router.get("/GetMessages",ProtectionRoute,getMessage);

module.exports = router;