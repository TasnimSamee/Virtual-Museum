const express = require("express");
const router = express.Router();
const {
    getQuizzes,
    getQuizById,
    submitQuiz,
    createQuiz,
    getMyResults,
    deleteQuiz
} = require("../controllers/quizController");
const { protect, admin } = require("../middleware/authMiddleware");

// Public endpoints
router.get("/", getQuizzes);
router.get("/:id", getQuizById);

// Protected endpoints
router.post("/:id/submit", submitQuiz); // Removed protect to allow visitors
router.get("/results/my", protect, getMyResults);
router.post("/", protect, admin, createQuiz);
router.delete("/:id", protect, admin, deleteQuiz);

module.exports = router;
