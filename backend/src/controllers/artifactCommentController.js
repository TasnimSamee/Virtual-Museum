const ArtifactComment = require("../models/Artifactcomment");

// POST COMMENT (logged-in users only)
exports.addArtifactComment = async (req, res) => {
  try {
    const { artifactId, text } = req.body;

    if (!text || !artifactId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const comment = new ArtifactComment({
      artifact: artifactId,
      user: req.user._id, // ✅ FIXED (was req.user.id)
      text,
    });

    await comment.save();

    const populatedComment = await comment.populate("user", "name");

    res.status(201).json(populatedComment);
  } catch (error) {
    console.error("Add comment error:", error);
    res.status(500).json({ message: "Failed to add comment" });
  }
};

// GET COMMENTS (pagination)
exports.getArtifactComments = async (req, res) => {
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
    console.error("Fetch comments error:", error);
    res.status(500).json({ message: "Failed to fetch comments" });
  }
};
