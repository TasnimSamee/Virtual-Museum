const Feedback = require("../models/Feedback");

const submitFeedback = async (req, res) => {
  try {
    const { name, email, rating, message } = req.body;

    if (!rating || !message) {
      return res.status(400).json({
        message: "Rating and message are required",
      });
    }

    const feedback = await Feedback.create({
      name,
      email,
      rating,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
  console.error("FEEDBACK ERROR:", error);

  res.status(500).json({
    message: "Failed to submit feedback",
    error: error.message
  });
}

};

const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};

module.exports = {
  submitFeedback,
  getAllFeedback,
};


