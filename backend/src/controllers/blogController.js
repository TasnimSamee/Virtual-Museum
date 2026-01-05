const Blog = require("../models/Blog");

// @desc    Get approved blogs (paginated)
// @route   GET /api/blogs
// @access  Public
exports.getBlogs = async (req, res) => {
    try {
        const pageSize = 10;
        const page = Number(req.query.page) || 1;

        const count = await Blog.countDocuments({ isApproved: true });
        const blogs = await Blog.find({ isApproved: true })
            .populate("author", "username")
            .limit(pageSize)
            .skip(pageSize * (page - 1))
            .sort({ createdAt: -1 });

        res.json({ blogs, page, pages: Math.ceil(count / pageSize) });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate("author", "username");
        if (blog) {
            // Allow viewing if approved OR if the user is the author/admin (handled by frontend logic mostly, but good for security if we enforced it strictly here. For now, public usually sees approved. We can relax this for verifying own pending posts if needed)
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private (User)
exports.createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;

        let imagePath = req.body.image || ""; // Keep supporting URL if provided (though form usually sends file)
        if (req.file) {
            // Construct standard URL path from file path
            imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
        }

        const blog = new Blog({
            title,
            content,
            image: imagePath,
            author: req.user._id,
            isApproved: false // Explicitly false
        });
        const createdBlog = await blog.save();
        res.status(201).json(createdBlog);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Like a blog
// @route   PUT /api/blogs/:id/like
// @access  Public
exports.likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.likes = blog.likes + 1;
            await blog.save();
            res.json({ likes: blog.likes });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Comment on a blog
// @route   POST /api/blogs/:id/comment
// @access  Public
exports.commentBlog = async (req, res) => {
    try {
        const { text, name } = req.body;
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            const comment = {
                text,
                name: name || "Anonymous",
            };
            blog.comments.push(comment);
            await blog.save();
            res.status(201).json(blog.comments);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get pending blogs
// @route   GET /api/blogs/pending
// @access  Private (Admin)
exports.getPendingBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isApproved: false }).populate("author", "username profilePicture");
        res.json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Approve blog
// @route   PUT /api/blogs/:id/approve
// @access  Private (Admin)
exports.approveBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            blog.isApproved = true;
            const updatedBlog = await blog.save();
            res.json(updatedBlog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Delete blog (Admin/Owner)
// @route   DELETE /api/blogs/:id
// @access  Private
exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) {
            // Check if user is author or admin
            if (blog.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
                return res.status(401).json({ message: "Not authorized to delete this blog" });
            }

            await blog.deleteOne();
            res.json({ message: "Blog removed" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};
