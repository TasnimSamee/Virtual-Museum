const express = require("express");
const router = express.Router();
<<<<<<< HEAD
const artifactController = require("../controllers/artifactController");  // Import controller

// 1️⃣ artifacts by gallery and search query
router.get("/gallery/:slug", artifactController.getArtifactsByGallery);  // Use controller function

// 2️⃣ single artifact by slug
router.get("/:slug", artifactController.getArtifactById);  // Use controller function
=======
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
>>>>>>> b7e7089a1759131ddcaa57faff741c6bc55d583a

module.exports = router;
