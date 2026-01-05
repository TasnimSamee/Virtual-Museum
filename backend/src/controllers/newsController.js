const News = require('../models/News');
const Parser = require('rss-parser');

// 1. Initialize the machine (The blueprint -> The instance)
const parser = new Parser();

exports.getLatestNews = async (req, res) => {
    try {
        // 2. Fetch news from the "Ancient Origins" RSS feed
        // This makes your museum feel current and educational
        const feed = await parser.parseURL('https://www.theguardian.com/science/archaeology/rss');

        // 3. Process the news and Save/Update in MongoDB Atlas
        // We use .slice(0, 10) to get the 10 newest stories
        const savePromises = feed.items.slice(0, 10).map(item => {
            return News.findOneAndUpdate(
                { link: item.link }, // Check if we already have this story
                { 
                    title: item.title, 
                    pubDate: item.pubDate, 
                    content: item.contentSnippet 
                }, 
                { upsert: true, new: true } // 'upsert' means "Create if it doesn't exist"
            );
        });

        // Wait for all database operations to finish
        await Promise.all(savePromises);

        // 4. Retrieve all news from your Atlas database
        // Remember: MongoDB will automatically delete items older than 1 year 
        // because of the "expires" setting in your Model!
        const allNews = await News.find().sort({ pubDate: -1 });

        // 5. Send the data to your React frontend
        res.status(200).json(allNews);

    } catch (error) {
        // Log the error to your terminal so you can debug
        console.error("Museum News Error:", error.message);
        
        res.status(500).json({ 
            message: "Failed to fetch news", 
            error: error.message 
        });
    }
};