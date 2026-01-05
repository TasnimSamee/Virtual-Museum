import { useState } from "react";
import axios from "axios";

function ArtifactCommentForm({ artifactId }) {
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // later we will check auth
    await axios.post("http://localhost:5000/api/artifact-comments", {
      artifactId,
      text,
    });

    setText("");
    window.location.reload(); // simple refresh for now
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <textarea
        placeholder="Write your comment..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        style={{ width: "100%", height: "80px" }}
      />
      <button type="submit">Post Comment</button>
    </form>
  );
}

export default ArtifactCommentForm;
