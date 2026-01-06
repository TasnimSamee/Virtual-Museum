const express = require("express");
const router = express.Router();
const {
    getBlogs,
    getBlogById,
    createBlog,
    likeBlog,
    commentBlog,
    getPendingBlogs,
    approveBlog,
    deleteBlog,
    updateBlog
} = require("../controllers/blogController");
const { protect, admin } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

// Public routes
router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.put("/:id/like", likeBlog);
router.post("/:id/comment", commentBlog);

// Protected routes (User)
router.post("/", protect, upload.single("image"), createBlog);

// Admin routes
router.get("/pending/all", protect, admin, getPendingBlogs); // '/pending' might conflict with '/:id' if not careful, using specific path
router.put("/:id/approve", protect, admin, approveBlog);
router.put("/:id", protect, upload.single("image"), updateBlog);
router.delete("/:id", protect, deleteBlog);

module.exports = router;
