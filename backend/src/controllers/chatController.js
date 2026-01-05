// backend/src/controllers/chatController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-3-flash-preview",
      // 👉 SYSTEM INSTRUCTIONS ADDED HERE
      systemInstruction: {
        role: "system",
        parts: [{ 
          text: `You are a friendly and expert Virtual Museum Guide. 
                 Your job is to help visitors understand history and artifacts. 
                 Be polite, informative, and engaging. 
                 If someone asks a question not related to history or museums, 
                 politely steer the conversation back to the exhibits.` 
        }]
      }
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    res.json({ reply: response.text() });
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    res.status(500).json({ error: "AI error", details: error.message });
  }
};