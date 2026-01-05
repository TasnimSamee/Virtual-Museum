import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
    fetchBlogs(1);
  }, []);

  const fetchBlogs = async (pageNum) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`http://localhost:5000/api/blogs?page=${pageNum}`);
      if (pageNum === 1) {
        setBlogs(data.blogs);
      } else {
        setBlogs((prev) => [...prev, ...data.blogs]);
      }
      setTotalPages(data.pages);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch blogs");
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchBlogs(nextPage);
    }
  };

  // Helper to truncate text
  const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Museum Blog</h1>
        {user && (
          <Link to="/blog/create" style={styles.createButton}>
            Write a Blog
          </Link>
        )}
      </div>

      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <div style={styles.grid}>
        {blogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} style={styles.cardLink}>
            <div style={styles.card}>
              {blog.image && (
                <div style={styles.imageContainer}>
                  <img src={blog.image} alt={blog.title} style={styles.image} />
                </div>
              )}
              <div style={styles.content}>
                <h3 style={styles.blogTitle}>{blog.title}</h3>
                <p style={styles.meta}>
                  By {blog.author?.username || "Unknown"} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <p style={styles.excerpt}>{truncate(blog.content, 100)}</p>
                <div style={styles.footer}>
                  <span style={styles.likes}>❤️ {blog.likes} Likes</span>
                  <span style={styles.readMore}>Read More &rarr;</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {loading && <p style={{ textAlign: "center", color: "#aaa" }}>Loading...</p>}

      {!loading && page < totalPages && (
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button onClick={loadMore} style={styles.loadMoreButton}>
            Show More
          </button>
        </div>
      )}

      {!loading && blogs.length === 0 && (
        <p style={{ textAlign: "center", color: "#aaa", marginTop: "50px" }}>No blogs found yet. Be the first to write one!</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "40px auto",
    padding: "0 20px",
    color: "#f5f5f5",
    fontFamily: "'Inter', sans-serif",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "40px",
    borderBottom: "1px solid #333",
    paddingBottom: "20px",
  },
  title: {
    fontSize: "2.5rem",
    color: "gold",
    margin: 0,
  },
  createButton: {
    padding: "10px 20px",
    background: "#00b894",
    color: "white",
    textDecoration: "none",
    borderRadius: "30px",
    fontWeight: "bold",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "30px",
  },
  cardLink: {
    textDecoration: "none",
    color: "inherit",
  },
  card: {
    background: "#1e1e1e",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transition: "transform 0.2s",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  imageContainer: {
    height: "200px",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  content: {
    padding: "20px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
  },
  blogTitle: {
    fontSize: "1.2rem",
    marginBottom: "10px",
    color: "#f5f5f5",
  },
  meta: {
    fontSize: "0.85rem",
    color: "#888",
    marginBottom: "15px",
  },
  excerpt: {
    fontSize: "0.95rem",
    color: "#ccc",
    lineHeight: "1.5",
    marginBottom: "20px",
    flex: 1,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: "15px",
    borderTop: "1px solid #333",
  },
  likes: {
    color: "#ff7675",
    fontSize: "0.9rem",
  },
  readMore: {
    color: "gold",
    fontSize: "0.9rem",
    fontWeight: "bold",
  },
  loadMoreButton: {
    padding: "12px 30px",
    background: "transparent",
    border: "2px solid gold",
    color: "gold",
    borderRadius: "30px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    transition: "all 0.3s",
  },
};

export default Blog;
