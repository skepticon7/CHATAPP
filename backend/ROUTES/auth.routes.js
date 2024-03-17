const express = require('express');
const  {signup , login , logout} = require("../CONTROLLERS/auth.controlllers.js");
const router = express.Router();

router.post("/login",login);
router.post("/logout",logout);
router.post("/signup",signup);

module.exports = router;