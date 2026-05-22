const express = require("express");
const router = express.Router();
const {auth} = require("../middleware/auth")
const {signUp} = require("../controllers/Auth")
const {sendOTP} =require("../controllers/Auth")
const {login,changePassword} =require("../controllers/Auth")

const {resetPasswordToken} = require("../controllers/ResetPassword")
const {resetPassword} = require("../controllers/ResetPassword")

router.post("/signup", signUp);
router.post("/sendotp", sendOTP);
router.post("/login", login);
router.post("/changepassword", auth, changePassword)

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);

module.exports = router;