const express = require("express");
const router = express.Router();
const Artifact = require("../models/Artifact");

// 1️⃣ artifacts by gallery
router.get("/gallery/:slug", async (req, res) => {
  const artifacts = await Artifact.find({ gallery: req.params.slug });
  res.json(artifacts);
});

// 2️⃣ single artifact by slug
router.get("/:slug", async (req, res) => {
  const artifact = await Artifact.findOne({ slug: req.params.slug });

  if (!artifact) {
    return res.status(404).json({ message: "Artifact not found" });
  }

  res.json(artifact);
});

module.exports = router;

