import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hello! I am your Museum Guide. How can I help you today?' }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to the latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { 
        message: input 
      });
      setMessages((prev) => [...prev, { role: 'bot', text: response.data.reply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'bot', text: 'Sorry, I am having trouble connecting.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chat-toggle" onClick={() => setIsOpen(true)}>
          💬 Ask Guide
        </button>
      )}

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <h3>Museum Guide AI</h3>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>
          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="message bot">Typing...</div>}
            <div ref={scrollRef} />
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)} 
              placeholder="Ask about history..."
            />
            <button type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBot;