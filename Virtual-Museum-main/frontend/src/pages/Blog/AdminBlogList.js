import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL, { getImageUrl } from "../../config/apiConfig";

function AdminBlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPendingBlogs();
    }, []);

    const fetchPendingBlogs = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            const { data } = await axios.get(`${API_BASE_URL}/api/blogs/pending/all`, config);
            setBlogs(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch pending blogs");
            setLoading(false);
        }
    };

    const approveBlog = async (id) => {
        if (!window.confirm("Approve this blog?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.put(`${API_BASE_URL}/api/blogs/${id}/approve`, {}, config);
            setBlogs(blogs.filter((blog) => blog._id !== id));
            alert("Blog approved!");
        } catch (err) {
            alert("Failed to approve blog");
        }
    };

    const rejectBlog = async (id) => {
        if (!window.confirm("Reject and delete this blog?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            await axios.delete(`${API_BASE_URL}/api/blogs/${id}`, config);
            setBlogs(blogs.filter((blog) => blog._id !== id));
            alert("Blog rejected!");
        } catch (err) {
            alert("Failed to reject blog");
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Pending Blogs</h2>
            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

            {blogs.length === 0 ? (
                <p style={{ textAlign: "center", color: "#aaa" }}>No pending blogs.</p>
            ) : (
                <div style={styles.list}>
                    {blogs.map((blog) => (
                        <div key={blog._id} style={styles.card}>
                            <h3 style={styles.blogTitle}>{blog.title}</h3>
                            <p style={styles.meta}>By: {blog.author?.username}</p>
                            <div style={styles.preview}>
                                {blog.image && <img src={getImageUrl(blog.image)} alt="Preview" style={styles.image} />}
                                <p>{blog.content.substring(0, 150)}...</p>
                            </div>
                            <div style={styles.actions}>
                                <button onClick={() => approveBlog(blog._id)} style={styles.approveButton}>Approve</button>
                                <button onClick={() => rejectBlog(blog._id)} style={styles.rejectButton}>Reject</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "20px",
        color: "#f5f5f5",
        fontFamily: "'Inter', sans-serif",
    },
    title: {
        textAlign: "center",
        marginBottom: "30px",
        color: "gold",
    },
    loading: { textAlign: "center", marginTop: "50px", color: "#aaa" },
    list: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    card: {
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "8px",
        border: "1px solid #333",
    },
    blogTitle: {
        margin: "0 0 10px 0",
        color: "#f5f5f5",
    },
    meta: {
        fontSize: "0.9rem",
        color: "#888",
        marginBottom: "15px",
    },
    preview: {
        display: "flex",
        gap: "15px",
        marginBottom: "20px",
        color: "#ccc",
    },
    image: {
        width: "100px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "4px",
    },
    actions: {
        display: "flex",
        gap: "10px",
    },
    approveButton: {
        padding: "8px 16px",
        background: "#00b894",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    rejectButton: {
        padding: "8px 16px",
        background: "#d63031",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default AdminBlogList;
