import { useEffect, useState } from "react";
import { getFeaturedGalleries } from "../../services/galleryService";
import GalleryCard from "../../components/GalleryCard/GalleryCard";

function Home() {
  const [galleries, setGalleries] = useState([]);

  useEffect(() => {
    const fetchGalleries = async () => {
      const data = await getFeaturedGalleries();
      setGalleries(data);
    };

    fetchGalleries();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Explore World Civilizations</h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {galleries.map((gallery) => (
          <GalleryCard key={gallery._id} gallery={gallery} />
        ))}
      </div>
    </div>
  );
}

export default Home;

