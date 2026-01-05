import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// 👉 COMMENT COMPONENTS
import ArtifactCommentForm from "../../components/ArtifactComment/ArtifactCommentForm";
import ArtifactCommentList from "../../components/ArtifactComment/ArtifactCommentList";

function ArtifactDetail() {
  const { slug } = useParams();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    const fetchArtifact = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/artifacts/${slug}`
        );
        setArtifact(res.data);
      } catch (error) {
        console.error("Failed to load artifact", error);
      }
    };

    fetchArtifact();
  }, [slug]);

  if (!artifact) return <p style={{ padding: "40px" }}>Loading...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      {/* ===== ARTIFACT INFO ===== */}
      <h1>{artifact.name}</h1>
      <p>
        <strong>Period:</strong> {artifact.period}
      </p>

      <img
        src={artifact.image}
        alt={artifact.name}
        style={{
          width: "100%",
          maxHeight: "400px",
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
