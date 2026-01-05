import { useEffect, useState } from "react";
import axios from "axios";

function ArtifactCommentList({ artifactId }) {
  const [comments, setComments] = useState([]);
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 5;

  const fetchComments = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/artifact-comments/${artifactId}?limit=${limit}&skip=${skip}`
    );

    setComments((prev) => [...prev, ...res.data.comments]);
    setTotal(res.data.total);
    setSkip(skip + limit);
  };

  useEffect(() => {
    fetchComments();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>Comments</h3>

      {comments.map((c) => (
        <div key={c._id} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
          <strong>{c.user?.name || "Anonymous"}</strong>
          <p>{c.text}</p>
        </div>
      ))}

      {comments.length < total && (
        <button onClick={fetchComments} style={{ marginTop: "10px" }}>
          Show more
        </button>
      )}
    </div>
  );
}

export default ArtifactCommentList;
