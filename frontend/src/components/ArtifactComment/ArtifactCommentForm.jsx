import { useState } from "react";
import axios from "axios";

function ArtifactCommentForm({ artifactId }) {
  const [text, setText] = useState("");
  const token = localStorage.getItem("token"); // 🔑 auth check

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🚫 Visitor protection
    if (!token) {
      alert("Please login to comment");
      return;
    }

    if (!text.trim()) return;

    try {
      await axios.post(
        "http://localhost:5000/api/artifact-comments",
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
      window.location.reload(); // simple refresh (ok for now)
    } catch (error) {
      console.error("Comment failed:", error.response?.data || error.message);
      alert("Failed to post comment");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <textarea
        placeholder={
          token
            ? "Write your comment..."
            : "Login required to post a comment"
        }
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={!token}
        style={{
          width: "100%",
          height: "80px",
          opacity: token ? 1 : 0.6,
        }}
      />

      <button
        type="submit"
        disabled={!token}
        style={{
          marginTop: "10px",
          cursor: token ? "pointer" : "not-allowed",
        }}
      >
        Post Comment
      </button>
    </form>
  );
}

export default ArtifactCommentForm;
