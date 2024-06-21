const express = require("express");
const app = express();
const path = require("path");
const cors =require("cors");
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
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const authRoute = require("./routes/authRoute");
const contactRoute = require("./routes/contactRoute");
const infoRoute = require("./routes/infoRoute");
const projectRoute = require("./routes/projectRoute");
const skillsRoute =require("./routes/skillsRoute")

app.use("/api/auth", authRoute);
app.use("/api/contact", contactRoute);
app.use("/api/info", infoRoute);
app.use("/api/project", projectRoute);
app.use("/api/skill",skillsRoute);

app.use(express.static(path.join(__dirname, "../frontend", "dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
});


app.listen(PORT, () => {
  console.log(`Server is Listening on http://localhost:${PORT}`);
});
