import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

function ArtifactCommentForm({ artifactId }) {
  const [text, setText] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const token = userInfo?.token;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("Please login to comment");
      return;
    }

    if (!text.trim()) return;

    try {
      await axios.post(
        `${API_BASE_URL}/api/artifact-comments`,
        {
          artifactId,
          text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setText("");
      window.location.reload();
    } catch (error) {
      console.error("Comment failed:", error.response?.data || error.message);
      alert("Failed to post comment");
    }
  };

  return (
    <div style={{ marginTop: "40px", background: "#ffffff", padding: "24px", borderRadius: "12px", border: "1px solid #e5e5e5", boxShadow: "0 6px 20px rgba(0,0,0,0.06)" }}>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder={
            token
              ? "Share your thoughts on this artifact..."
              : "Please login to join the conversation"
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={!token}
          style={{
            width: "100%",
            height: "140px",
            background: token ? "#ffffff" : "#fcfcfc",
            color: "#2c3e50",
            border: "1px solid #dcdde1",
            borderRadius: "8px",
            padding: "18px",
            fontSize: "1.05rem",
            lineHeight: "1.6",
            resize: "vertical",
            outline: "none",
            transition: "all 0.3s ease",
            boxSizing: "border-box",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = "#c0392b";
            e.target.style.boxShadow = "0 0 0 3px rgba(192, 57, 43, 0.1)";
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "#dcdde1";
            e.target.style.boxShadow = "none";
          }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "24px" }}>
          <button
            type="submit"
            disabled={!token || !text.trim()}
            style={{
              padding: "14px 32px",
              background: "#c0392b", // Stronger red base
              opacity: token && text.trim() ? 1 : 0.4, // Faded red instead of grey
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "1rem",
              letterSpacing: "0.5px",
              cursor: token && text.trim() ? "pointer" : "not-allowed",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: token && text.trim() ? "0 4px 10px rgba(192, 57, 43, 0.3)" : "none",
            }}
            onMouseOver={(e) => {
              if (token && text.trim()) {
                e.target.style.background = "#e74c3c";
                e.target.style.transform = "translateY(-2px)";
              }
            }}
            onMouseOut={(e) => {
              if (token && text.trim()) {
                e.target.style.background = "#c0392b";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            Post Comment
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArtifactCommentForm;
