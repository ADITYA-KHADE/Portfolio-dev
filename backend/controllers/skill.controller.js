const Skills = require("../models/skills.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "../uploads", "skills");
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
      `${file.fieldname}_${Date.now() + path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

exports.uploadImages = upload.fields([
  { name: "dark", maxCount: 1 },
  { name: "light", maxCount: 1 },
]);

exports.addSkill = async (req, res) => {
  try {
    const { name, type, url } = req.body;
    const { dark, light } = req.files;

    // if (!files || !files.dark || !files.light) {
    //   return res.status(400).json({ message: "Both images are required" });
    // }

    const darkImage = dark ? `/uploads/skills/${dark[0].filename}` : null;
    const lightImage = light ? `/uploads/skills/${light[0].filename}` : null;

    const newSkill = new Skills({
      name,
      type,
      url,
      image: { dark: darkImage, light: lightImage },
    });

    await newSkill.save();

    res.status(200).json({
      name: name,
      type: type,
      url: url,
      image: { dark: darkImage, light: lightImage },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSkills = async (req, res) => {
  const { type } = req.body;
  if (!type) {
    return res.status(200).send([]);
  }
  try {
    const skills = await Skills.find({ type: type });
    res.status(200).json(skills);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
