import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { getImageUrl } from "../../config/apiConfig";

// 👉 COMMENT COMPONENTS
import ArtifactCommentForm from "../../components/ArtifactComment/ArtifactCommentForm";
import ArtifactCommentList from "../../components/ArtifactComment/ArtifactCommentList";

function ArtifactDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${API_BASE_URL}/api/artifacts/${slug}`
        );
        setArtifact(res.data);
        setError(null);
      } catch (error) {
        console.error("Failed to load artifact", error);
        setError("Could not load artifact details. It might have been removed or the server is down.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtifact();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <h2>Loading Artifact Details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "red" }}>
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!artifact) return null;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      {/* ===== ARTIFACT INFO ===== */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h1 style={{ color: "gold", margin: 0 }}>{artifact.name}</h1>
        {user && user.role === "admin" && (
          <button
            onClick={() => navigate(`/artifacts/edit/${artifact._id}`)}
            style={{
              padding: "10px 20px",
              background: "#f39c12",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            ✏️ Edit
          </button>
        )}
      </div>
      <p>
        <strong>Period:</strong> {artifact.period}
      </p>

      <img
        src={getImageUrl(artifact.image)}
        alt={artifact.name}
        style={{
          width: "100%",
          maxHeight: "auto",
          objectFit: "cover",
          margin: "20px 0",
          borderRadius: "10px",
        }}
      />

      <p>{artifact.description}</p>

      {/* ===== 3D MODEL ===== */}
      {artifact.model3D && (
        <>
          <h3>3D View</h3>
          <iframe
            src={artifact.model3D}
            width="100%"
            height="480"
            frameBorder="0"
            allow="autoplay; fullscreen; xr-spatial-tracking"
            allowFullScreen
            title="3D Model"
            style={{ marginTop: "20px", borderRadius: "10px" }}
          ></iframe>
        </>
      )}

      {/* ===== COMMENTS SECTION ===== */}
      <hr style={{ margin: "40px 0" }} />

      <h2>Comments</h2>

      {/* Only logged-in users will POST (backend enforces this) */}
      <ArtifactCommentForm artifactId={artifact._id} />

      {/* Latest 5 comments + Load More */}
      <ArtifactCommentList artifactId={artifact._id} />
    </div>
  );
}

export default ArtifactDetail;
