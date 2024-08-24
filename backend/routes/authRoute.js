const express = require('express')
const router = express.Router()
const {login,signup,logout,getToken}=require("../controllers/auth")

router.post('/login',login);
router.post('/signup',signup);
router.post('/logout',logout);
router .post('/getToken',getToken)

module.exports = router