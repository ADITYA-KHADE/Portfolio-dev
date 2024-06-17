const express = require('express')
const router = express.Router()
const {getSkills,addSkill,uploadImages} =require("../controllers/skill.controller")

router.get("/getskills",getSkills);
router.post("/addskill",uploadImages,addSkill);

module.exports = router