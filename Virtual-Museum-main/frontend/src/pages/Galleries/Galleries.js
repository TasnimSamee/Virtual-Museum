import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL, { getImageUrl } from "../../config/apiConfig";

function Galleries() {
  const [galleries, setGalleries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGalleries = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/galleries`);
      setGalleries(res.data);
    };

    fetchGalleries();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Galleries</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {galleries.map((gallery) => (
          <div
            key={gallery._id}
            onClick={() => navigate(`/galleries/${gallery.slug}`)}
            style={{
              cursor: "pointer",
              border: "1px solid #ddd",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <img
              src={getImageUrl(gallery.coverImage)}
              alt={gallery.title}
              style={{ width: "100%", height: "180px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3>{gallery.title}</h3>
              <p>{gallery.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Galleries;

