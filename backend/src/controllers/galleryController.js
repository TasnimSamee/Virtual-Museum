const Gallery = require("../models/Gallery");

// GET ALL GALLERIES
const getAllGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find(); // DECLARE FIRST
    res.status(200).json(galleries);
  } catch (error) {
    console.error("GALLERY ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch galleries",
    });
  }
};

// GET FEATURED GALLERIES
const getFeaturedGalleries = async (req, res) => {
  try {
    const galleries = await Gallery.find({ isFeatured: true });
    res.status(200).json(galleries);
  } catch (error) {
    console.error("FEATURED GALLERY ERROR:", error);
    res.status(500).json({
      message: "Failed to fetch featured galleries",
    });
  }
};

module.exports = {
  getAllGalleries,
  getFeaturedGalleries,
};
