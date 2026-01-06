const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");

// ROUTE: POST /api/newsletter/subscribe
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  // 1. Validation
  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
    // 2. Check if already exists
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "You are already subscribed!" });
    }

    // 3. Save to MongoDB
    const newSub = new Subscriber({ email });
    await newSub.save();

    console.log(`✅ New Subscriber: ${email}`);
    res.status(201).json({ success: true, message: "Successfully subscribed!" });

  } catch (error) {
    console.error("❌ Newsletter Error:", error);
    res.status(500).json({ success: false, message: "Server error. Try again later." });
  }
});

module.exports = router;