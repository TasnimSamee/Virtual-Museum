import React, { useEffect, useState } from "react";

export default function Home() {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    fetch("/api/artifacts")
      .then((res) => res.json())
      .then((data) => setArtifacts(data));
  }, []);

  return (
    <div className="home-container">
      <h1>Featured Artifacts</h1>
      <div className="artifacts-grid">
        {artifacts.map((a) => (
          <div key={a.id} className="artifact-card">
            <h2>{a.name}</h2>
            <p><strong>Year:</strong> {a.year}</p>
            <p>{a.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
