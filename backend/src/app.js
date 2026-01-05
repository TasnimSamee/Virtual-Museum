const express = require("express");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const artifactRoutes = require("./routes/artifactRoutes");
const chatRoutes = require("./routes/chatRoutes");
const newsRoutes = require("./routes/newsRoutes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json()); // VERY IMPORTANT (req.body)
app.use("/uploads", express.static(require("path").join(__dirname, "../uploads")));

/* ---------- ROUTES ---------- */
app.use("/api/news", newsRoutes);
app.use("/api/galleries", galleryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/artifacts", artifactRoutes);
app.use(
  "/api/artifact-comments",
  require("./routes/artifactCommentRoutes")
);

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/blogs", require("./routes/blogRoutes"));
app.use("/api/quizzes", require("./routes/quizRoutes"));
app.use("/api/chat", chatRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Virtual Museum API is running 🚀");
});

module.exports = app;
