const express = require("express");
const router = express.Router();

const controller = require("../controllers/artifactCommentController");
const { protect } = require("../middleware/authMiddleware");

// POST → logged-in users only
router.post("/", protect, controller.addArtifactComment);


router.get("/:artifactId", controller.getArtifactComments);

module.exports = router;
