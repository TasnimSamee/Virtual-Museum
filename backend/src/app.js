const express = require("express");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const artifactRoutes = require("./routes/artifactRoutes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json()); // VERY IMPORTANT (req.body)

/* ---------- ROUTES ---------- */
app.use("/api/galleries", galleryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/artifacts", artifactRoutes);
app.use(
  "/api/artifact-comments",
  require("./routes/artifactCommentRoutes")
);


/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Virtual Museum API is running 🚀");
});

module.exports = app;
