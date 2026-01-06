const Quiz = require("../models/Quiz");
const QuizResult = require("../models/QuizResult");
const User = require("../models/User");

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res) => {
    try {
        // Return quizzes without the correct answers for security (though frontend needs options)
        const quizzes = await Quiz.find({}, "-questions.correctAnswer");
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get single quiz by ID
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuizById = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id, "-questions.correctAnswer");
        if (quiz) {
            res.json(quiz);
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Submit quiz answers and get score
// @route   POST /api/quizzes/:id/submit
// @access  Private
exports.submitQuiz = async (req, res) => {
    try {
        const { answers } = req.body; // Array of selected answers (strings) matching question index or ID
        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }

        let score = 0;
        const results = quiz.questions.map((q, index) => {
            const isCorrect = q.correctAnswer === answers[index];
            if (isCorrect) score++;
            return {
                question: q.question,
                correctAnswer: q.correctAnswer,
                userAnswer: answers[index],
                isCorrect
            };
        });

        // Save result if user logged in
        // Save result and update stats if user logged in
        if (req.user) {
            await QuizResult.create({
                user: req.user._id,
                quiz: quiz._id,
                score,
                totalQuestions: quiz.questions.length
            });

            // Gamification Logic
            const pointsEarned = score * 10;
            const newBadges = [];
            const userBadges = req.user.badges || [];

            // Badge: "Art Novice" (First Quiz Taken)
            // Check if this is their first result
            const resultCount = await QuizResult.countDocuments({ user: req.user._id });
            if (resultCount === 1 && !userBadges.includes("Art Novice")) {
                newBadges.push("Art Novice");
            }

            // Badge: "Quiz Master" (100% Score)
            if (score === quiz.questions.length && score > 0 && !userBadges.includes("Quiz Master")) {
                newBadges.push("Quiz Master");
            }

            // Update User
            if (pointsEarned > 0 || newBadges.length > 0) {
                // req.user is a mongoose document from authMiddleware, so we can save directly or use update
                // Using findByIdAndUpdate to ensure we have latest and atomic push
                await User.findByIdAndUpdate(req.user._id, {
                    $inc: { points: pointsEarned },
                    $addToSet: { badges: { $each: newBadges } }
                });
            }
        }

        res.json({
            score,
            total: quiz.questions.length,
            results
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a quiz
// @route   POST /api/quizzes
// @access  Private (Admin)
exports.createQuiz = async (req, res) => {
    try {
        const { title, description, questions } = req.body;
        const quiz = await Quiz.create({
            title,
            description,
            questions,
            createdBy: req.user._id
        });
        res.status(201).json(quiz);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get user results
// @route   GET /api/quizzes/results/my
// @access  Private
exports.getMyResults = async (req, res) => {
    try {
        const results = await QuizResult.find({ user: req.user._id })
            .populate("quiz", "title")
            .sort({ date: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
// @desc    Delete a quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin)
exports.deleteQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);

        if (quiz) {
            await quiz.deleteOne();
            res.json({ message: "Quiz removed" });
        } else {
            res.status(404).json({ message: "Quiz not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
