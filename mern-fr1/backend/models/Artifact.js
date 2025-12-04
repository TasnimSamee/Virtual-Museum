const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Artifact", artifactSchema);
const express = require("express");



const router = express.Router();
const Artifact = require("../models/Artifact");

// GET all artifacts
router.get("/", async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;





const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const artifactRoutes = require("./routes/artifacts");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/virtualMuseum", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/artifacts", artifactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
