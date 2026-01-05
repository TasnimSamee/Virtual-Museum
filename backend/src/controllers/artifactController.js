const Artifact = require("../models/Artifact");

exports.getArtifactsByGallery = async (req, res) => {
  try {
    const artifacts = await Artifact.find({
      gallery: req.params.slug,
    });
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtifactById = async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    res.json(artifact);
  } catch (err) {
    res.status(404).json({ message: "Artifact not found" });
  }
};
