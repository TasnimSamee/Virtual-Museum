const ArtifactComment = require("../models/Artifactcomment");

// POST comment (logged-in users only)
const addArtifactComment = async (req, res) => {
  try {
    const { artifactId, text } = req.body;

    const comment = new ArtifactComment({
      artifact: artifactId,
      user: req.user?.id || null, // safe for now
      text,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// GET comments with pagination
const getArtifactComments = async (req, res) => {
  try {
    const { artifactId } = req.params;
    const limit = parseInt(req.query.limit) || 5;
    const skip = parseInt(req.query.skip) || 0;

    const comments = await ArtifactComment.find({ artifact: artifactId })
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ArtifactComment.countDocuments({ artifact: artifactId });

    res.json({ comments, total });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};

module.exports = {
  addArtifactComment,
  getArtifactComments,
};
