import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Artifacts() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/artifacts/gallery/${slug}`
      );
      setArtifacts(res.data);
    };

    fetchArtifacts();
  }, [slug]);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Artifacts</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {artifacts.map((item) => (
          <div
            key={item._id}
            onClick={() => navigate(`/artifacts/${item.slug}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3>{item.name}</h3>
              <p>{item.period}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Artifacts;
