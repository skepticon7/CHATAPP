const express = require('express');
const  {signup , login , logout  , verifyCookie} = require("../CONTROLLERS/auth.controlllers.js");
const ProtectionRoute = require("../MIDDLWARE/ProtectionMiddlware.js");
const router = express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.post("/signup",signup);
router.get("/verify",verifyCookie);

module.exports = router;