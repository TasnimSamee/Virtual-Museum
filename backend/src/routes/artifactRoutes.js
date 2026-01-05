const express = require("express");
const router = express.Router();
const {
  getArtifactsByGallery,
  getArtifactById,
  getArtifactBySlug,
  createArtifact,
  updateArtifact
} = require("../controllers/artifactController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// 1️⃣ artifacts by gallery (slug-based)
router.get("/gallery/:slug", getArtifactsByGallery);

// 2️⃣ single artifact by ID (for editing)
router.get("/id/:id", getArtifactById);

// 3️⃣ single artifact by slug
router.get("/:slug", getArtifactBySlug);

// 4️⃣ create artifact (admin only)
router.post("/", protect, admin, upload.single("image"), createArtifact);

// 5️⃣ update artifact (admin only)
router.put("/:id", protect, admin, upload.single("image"), updateArtifact);

module.exports = router;

