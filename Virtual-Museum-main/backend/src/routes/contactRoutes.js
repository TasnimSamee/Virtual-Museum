const express = require('express');
const router = express.Router();
// We assume you might have a Contact model. 
// If you don't use a database for contacts, you can remove the Model import.
const Contact = require('../models/Contact'); 

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Create new contact entry
    const newContact = await Contact.create({
      name,
      email,
      message,
      sentAt: Date.now()
    });

    res.status(201).json({ 
      success: true, 
      data: newContact,
      message: 'Message sent successfully!' 
    });

  } catch (error) {
    console.error("Contact Error:", error);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error: Could not send message' 
    });
  }
});

module.exports = router;