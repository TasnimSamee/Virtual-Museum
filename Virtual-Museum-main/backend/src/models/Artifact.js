const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    gallery: { type: String, required: true }, // slug (ancient-greece)
    description: String,
    period: String,
    image: String,
    model3D: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artifact", artifactSchema);
