const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
const cookieParser = require("cookie-parser");
const fs = require('fs');

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

const mongodb = require("./config/connectdb");
mongodb();

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}_${Date.now() + path.extname(file.originalname)}`);
    },
});

const upload = multer({ storage: storage });

// app.use(upload.single("file"));  it is use to apply globally across all routes.

const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const infoRoute = require("./routes/infoRoute");
const projectRoute = require("./routes/projectRoute");

app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/info", infoRoute);
app.use("/api/project", projectRoute);

// Route to handle file uploads [only for project photos]
app.post("/upload-image", upload.single("file"), (req, res) => {
    try {
        res.status(200).json({ 
            success:1,
            image_url:`/image/${req.file.filename}`,
            message: 'Image uploaded successfully'
        });
    } catch (error) {
        res.status(400).send("Error uploading file");
    }
});

app.get("/image/:filename", (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, `uploads/${filename}`));
});

app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
