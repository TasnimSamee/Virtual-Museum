const express = require("express");
const router = express.Router();
const {
    getQuizzes,
    getQuizById,
    submitQuiz,
    createQuiz,
    getMyResults
} = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public endpoints
router.get("/", getQuizzes);
router.get("/:id", getQuizById);

// Protected endpoints
router.post("/:id/submit", protect, submitQuiz);
router.get("/results/my", protect, getMyResults);
router.post("/", protect, admin, createQuiz);

module.exports = router;
