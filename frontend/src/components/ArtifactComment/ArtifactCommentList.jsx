import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/apiConfig";

function ArtifactCommentList({ artifactId }) {
  const [comments, setComments] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const limit = 5;

  const fetchComments = useCallback(async (isInitial = false) => {
    try {
      setLoading(true);
      const currentSkip = isInitial ? 0 : skip;
      const res = await axios.get(
        `${API_BASE_URL}/api/artifact-comments/${artifactId}?limit=${limit}&skip=${currentSkip}`
      );

      if (isInitial) {
        setComments(res.data.comments);
        setSkip(limit);
      } else {
        setComments((prev) => [...prev, ...res.data.comments]);
        setSkip(currentSkip + limit);
      }
      setTotal(res.data.total);
    } catch (err) {
      console.error("Fetch comments failed:", err);
    } finally {
      setLoading(false);
    }
  }, [artifactId, skip, limit]);

  useEffect(() => {
    fetchComments(true);
    // eslint-disable-next-line
  }, [artifactId]);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3 style={{ borderBottom: "2px solid #e74c3c", display: "inline-block", paddingBottom: "5px", marginBottom: "25px", color: "#333" }}>
        Community Thoughts ({total})
      </h3>

      {comments.length === 0 && !loading && (
        <p style={{ color: "#888", fontStyle: "italic" }}>No comments yet. Be the first to share your thoughts!</p>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {comments.map((c) => (
          <div
            key={c._id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "8px",
              borderLeft: "4px solid #e74c3c",
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
              borderTop: "1px solid #f0f0f0",
              borderRight: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <strong style={{ color: "#e74c3c" }}>{c.user?.name || "Anonymous Member"}</strong>
              <small style={{ color: "#888" }}>
                {new Date(c.createdAt).toLocaleDateString()}
              </small>
            </div>
            <p style={{ margin: 0, color: "#333", lineHeight: "1.5" }}>{c.text}</p>
          </div>
        ))}
      </div>

      {loading && <p style={{ textAlign: "center", marginTop: "20px", color: "gold" }}>Loading more comments...</p>}

      {comments.length < total && !loading && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button
            onClick={() => fetchComments(false)}
            style={{
              padding: "8px 20px",
              background: "transparent",
              color: "gold",
              border: "1px solid gold",
              borderRadius: "20px",
              cursor: "pointer",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => (e.target.style.background = "rgba(255,215,0,0.1)")}
            onMouseOut={(e) => (e.target.style.background = "transparent")}
          >
            Show more comments
          </button>
        </div>
      )}
    </div>
  );
}

export default ArtifactCommentList;
