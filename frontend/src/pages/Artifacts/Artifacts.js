import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Artifacts() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [artifacts, setArtifacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");  // State for search query
  const [filteredArtifacts, setFilteredArtifacts] = useState([]);  // State for filtered artifacts

  useEffect(() => {
    const fetchArtifacts = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/artifacts/gallery/${slug}?searchQuery=${searchQuery}`
      );
      console.log(res.data);  // Check the response from the backend
      setArtifacts(res.data);
      // Set the filtered artifacts based on the search query
      if (searchQuery) {
        setFilteredArtifacts(
          res.data.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      } else {
        setFilteredArtifacts(res.data);  // If no search query, show all artifacts
      }
    };

    fetchArtifacts();
  }, [slug, searchQuery]);  // Refetch artifacts when searchQuery or slug changes

  return (
    <div style={{ padding: "40px" }}>
      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "30px",
          position: "relative",  // Ensure dropdown can be positioned below
        }}
      >
        <input
          type="text"
          placeholder="Search Artifacts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}  // Update search query
          style={{
            width: "50%",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "20px",
            border: "1px solid #ddd",
            outline: "none",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
          }}
        />
        {/* Dropdown-style list for filtered artifacts */}
        {searchQuery && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "25%",
              width: "50%",  // Match dropdown width to search bar width
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "10px",
              maxHeight: "300px",
              overflowY: "scroll",  // Allow scrolling if there are many artifacts
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
              zIndex: "1000",
            }}
          >
            {filteredArtifacts.length > 0 ? (
              filteredArtifacts.map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/artifacts/${item.slug}`)}
                  style={{
                    display: "flex",
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #ddd",
                    alignItems: "center", // Align image and text horizontally
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                  <div>
                    <h4 style={{ margin: 0 }}>{item.name}</h4>
                    <p style={{ margin: 0 }}>{item.period}</p>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ padding: "10px" }}>No results found</div>
            )}
          </div>
        )}
      </div>

      {/* Artifacts Display (If not using the dropdown) */}
      <h2 style={{ textAlign: "center" }}>Artifacts</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {artifacts.length > 0 ? (
          artifacts.map((item) => (
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
          ))
        ) : (
          <p style={{ textAlign: "center" }}>No artifacts found.</p>
        )}
      </div>
    </div>
  );
}

export default Artifacts;
