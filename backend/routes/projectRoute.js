const express = require('express')
const router = express.Router()
const {getProjects,addProject,uploadImage} =require("../controllers/project.controller")

router.post("/getprojects",getProjects);
router.post("/addproject",uploadImage,addProject);

module.exports = router