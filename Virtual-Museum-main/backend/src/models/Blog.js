const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    name: { type: String, default: "Anonymous" }, // For public comments
    createdAt: { type: Date, default: Date.now }
});

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String }, // URL to image
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    isApproved: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
    comments: [commentSchema],
}, {
    timestamps: true
});

module.exports = mongoose.model("Blog", blogSchema);
