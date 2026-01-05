import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { getImageUrl } from "../../config/apiConfig";

function Artifacts() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    const fetchArtifacts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/api/artifacts/gallery/${slug}`
        );
        setArtifacts(res.data);
        setError(null);
      } catch (err) {
        console.error("Fetch artifacts error:", err);
        setError("Failed to load artifacts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, [slug]);

  return (
    <div style={{ padding: "40px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "gold", margin: 0 }}>Artifacts</h1>
        {user && user.role === "admin" && (
          <Link
            to={`/artifacts/add?gallery=${slug}`}
            style={{
              padding: "10px 20px",
              background: "#00b894",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            + Add Artifact
          </Link>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: "center", padding: "40px" }}>
          <h2>Loading Artifacts...</h2>
        </div>
      )}

      {error && (
        <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
          <p>{error}</p>
        </div>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {!loading && !error && artifacts.length === 0 && (
          <p style={{ textAlign: "center", gridColumn: "1 / -1" }}>No artifacts found in this gallery.</p>
        )}
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
              src={getImageUrl(item.image)}
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
