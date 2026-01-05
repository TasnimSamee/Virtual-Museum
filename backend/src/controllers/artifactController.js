const Artifact = require("../models/Artifact");

exports.getArtifactsByGallery = async (req, res) => {
  try {
    const { slug } = req.params;
    const normalizedSlug = slug
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .join("-");

    const artifacts = await Artifact.find({
      gallery: normalizedSlug,
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

exports.getArtifactBySlug = async (req, res) => {
  try {
    const artifact = await Artifact.findOne({ slug: req.params.slug });
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }
    res.json(artifact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArtifact = async (req, res) => {
  try {
    const { name, gallery, description, period, model3D, imageUrl } = req.body;

    const slug = name
      .toLowerCase()
      .trim()
      .split(/\s+/)
      .join("-")
      .replace(/[^\w-]+/g, "");

    let imagePath = "";
    if (req.file) {
      // File upload
      imagePath = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      // Image URL provided
      imagePath = imageUrl;
    }

    const artifact = new Artifact({
      name,
      slug,
      gallery,
      description,
      period,
      image: imagePath,
      model3D,
    });

    const createdArtifact = await artifact.save();
    res.status(201).json(createdArtifact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArtifact = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gallery, description, period, model3D, imageUrl } = req.body;

    const artifact = await Artifact.findById(id);
    if (!artifact) {
      return res.status(404).json({ message: "Artifact not found" });
    }

    // Update basic fields
    artifact.name = name || artifact.name;
    artifact.gallery = gallery || artifact.gallery;
    artifact.description = description || artifact.description;
    artifact.period = period || artifact.period;
    artifact.model3D = model3D !== undefined ? model3D : artifact.model3D;

    // Update slug if name changed
    if (name && name !== artifact.name) {
      artifact.slug = name
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .join("-")
        .replace(/[^\w-]+/g, "");
    }

    // Handle image update
    if (req.file) {
      // New file uploaded
      artifact.image = `/uploads/${req.file.filename}`;
    } else if (imageUrl) {
      // New image URL provided
      artifact.image = imageUrl;
    }
    // If neither, keep existing image

    const updatedArtifact = await artifact.save();
    res.json(updatedArtifact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
