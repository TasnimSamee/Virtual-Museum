const express = require("express");
const router = express.Router();

const {
  getFeaturedGalleries,
  getAllGalleries,
} = require("../controllers/galleryController");

router.get("/featured", getFeaturedGalleries);
router.get("/", getAllGalleries);

module.exports = router;
