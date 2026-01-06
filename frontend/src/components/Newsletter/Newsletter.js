import React, { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // To show success/error messages
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault(); // Stop page refresh
    if (!email) return;

    setLoading(true);
    setStatus("");

    try {
      // ✅ Connects to your new Backend Route
      const res = await axios.post(`${API_BASE_URL}/api/newsletter/subscribe`, { email });

      setStatus({ type: "success", text: res.data.message });
      setEmail(""); // Clear the input box
    } catch (error) {
      // Handle 400 (Already Subscribed) or 500 (Server Error)
      const errorMsg = error.response?.data?.message || "Something went wrong. Try again.";
      setStatus({ type: "error", text: errorMsg });
    }
    setLoading(false);
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-box">
        <h2>Keep History Alive 🏺</h2>
        <p>Join our monthly digest. No spam, just art.</p>

        <form onSubmit={handleSubscribe} className="newsletter-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>

        {/* Show Success or Error Message */}
        {status && (
          <p className={`status-msg ${status.type}`}>
            {status.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default Newsletter;