const mongoose = require("mongoose");

const artifactCommentSchema = new mongoose.Schema(
  {
    artifactSlug: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    comment: {
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
