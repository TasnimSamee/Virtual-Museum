const express = require("express");
const cors = require("cors");

const galleryRoutes = require("./routes/galleryRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json()); // VERY IMPORTANT (req.body)

/* ---------- ROUTES ---------- */
app.use("/api/galleries", galleryRoutes);
app.use("/api/feedback", feedbackRoutes);

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("Virtual Museum API is running 🚀");
});

module.exports = app;
