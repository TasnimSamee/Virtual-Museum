function GalleryCard({ gallery }) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        width: "250px",
        overflow: "hidden",
      }}
    >
      <img
        src={gallery.coverImage}
        alt={gallery.title}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />

      <div style={{ padding: "10px" }}>
        <h3>{gallery.title}</h3>
        <p>{gallery.country}</p>
      </div>
    </div>
  );
}

export default GalleryCard;

