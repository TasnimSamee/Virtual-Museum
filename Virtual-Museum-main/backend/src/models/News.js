const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    link: { type: String, unique: true }, 
    pubDate: Date,
    content: String,
    createdAt: { 
        type: Date, 
        default: Date.now, 
        // 31536000 seconds = 1 Year
        expires: 31536000 
    }
});

module.exports = mongoose.model('News', NewsSchema);