const mongoose = require("mongoose");

const artifactCommentSchema = new mongoose.Schema(
  {
    artifact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artifact",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Artifactcomment",
  artifactCommentSchema
);
