const mongoose = require("mongoose");

const artifactSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Artifact", artifactSchema);
