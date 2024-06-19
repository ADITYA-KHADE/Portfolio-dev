const Projects = require("../models/project.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads", "projects");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single("photo");

exports.addProject = async (req, res) => {
  try {
    const { name, description, github, deploy, technologies } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Ensure technologies is an array
    const techArray = Array.isArray(technologies) ? technologies : JSON.parse(technologies);

    const newProject = new Projects({
      name,
      description,
      photo: `/uploads/projects/${file.filename}`,
      github,
      deploy,
      technologies: techArray,
    });

    await newProject.save();

    res.status(200).json({
      name: name,
      description: description,
      photo: `/uploads/projects/${file.filename}`,
      github: github,
      deploy: deploy,
      technologies: techArray,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getProjects = async (req, res) => {
  try {
    const projects = await Projects.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
