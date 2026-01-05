const Artifact = require("../models/Artifact");

exports.getArtifactsByGallery = async (req, res) => {
  const { slug } = req.params;
  const { searchQuery } = req.query;  // Get the search query from the query params

  try {
    let artifacts;

    // If there's a search query, filter artifacts by name (case-insensitive partial match)
    if (searchQuery) {
      artifacts = await Artifact.find({
        gallery: slug,
        name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
      });
    } else {
      // If no search query, return all artifacts for the gallery
      artifacts = await Artifact.find({ gallery: slug });
    }

    res.json(artifacts);  // Return the filtered or all artifacts
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
