const express = require("express");
const router = express.Router();
const artifactController = require("../controllers/artifactController");  // Import controller

// 1️⃣ artifacts by gallery and search query
router.get("/gallery/:slug", artifactController.getArtifactsByGallery);  // Use controller function

// 2️⃣ single artifact by slug
router.get("/:slug", artifactController.getArtifactById);  // Use controller function

module.exports = router;
