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
