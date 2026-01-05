const express = require("express");
const router = express.Router();

const controller = require("../controllers/artifactCommentController");

console.log("ArtifactCommentController:", controller);

router.post("/", controller.addArtifactComment);
router.get("/:artifactId", controller.getArtifactComments);

module.exports = router;
