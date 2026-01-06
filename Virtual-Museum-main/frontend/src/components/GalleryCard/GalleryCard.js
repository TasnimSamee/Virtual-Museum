import { Link } from "react-router-dom";
import { getImageUrl } from "../../config/apiConfig";

function GalleryCard({ gallery }) {
  return (
    <Link to={`/galleries/${gallery.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        style={{
          border: "1px solid #333",
          borderRadius: "12px",
          width: "250px",
          overflow: "hidden",
          background: "#1e1e1e",
          transition: "transform 0.3s, box-shadow 0.3s",
          cursor: "pointer",
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = "translateY(-5px)";
          e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.4)";
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <img
          src={getImageUrl(gallery.coverImage)}
          alt={gallery.title}
          style={{ width: "100%", height: "180px", objectFit: "cover" }}
        />

        <div style={{ padding: "15px" }}>
          <h3 style={{ margin: "0 0 5px 0", color: "gold" }}>{gallery.title}</h3>
          <p style={{ margin: 0, fontSize: "0.9rem", color: "#ccc", height: "3em", overflow: "hidden" }}>
            {gallery.description}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default GalleryCard;

