const express = require("express");
const router = express.Router();
const GetUsers = require("../CONTROLLERS/user.controller");
const ProtectRoute = require("../MIDDLWARE/ProtectionMiddlware");
const GetSpecificUser = require("../CONTROLLERS/getSpecificUser");
const {GetInvites,SendInvites,acceptInvite , rejectInvite} = require("../CONTROLLERS/user.invites");

router.get("/getusers",ProtectRoute,GetUsers);
router.get("/searchUser" , ProtectRoute,GetSpecificUser);
router.post("/sendInvites",ProtectRoute,SendInvites);
router.get("/getInvites"  , ProtectRoute,GetInvites);
router.delete("/acceptInvite", ProtectRoute, acceptInvite);
router.delete("/rejectInvite" , ProtectRoute, rejectInvite); 
module.exports = router;