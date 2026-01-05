import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function BlogDetail() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [commentText, setCommentText] = useState("");
    const [commentName, setCommentName] = useState("");
    const [isLiked, setIsLiked] = useState(false); // Basic local state for UX
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsedUser = JSON.parse(userInfo);
            setUser(parsedUser);
            setCommentName(parsedUser.username);
        }
    }, []);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/blogs/${id}`);
            setBlog(data);
            setLoading(false);
        } catch (err) {
            setError("Failed to fetch blog");
            setLoading(false);
        }
    };

    const handleLike = async () => {
        if (isLiked) return; // Prevent spamming in one session
        try {
            const { data } = await axios.put(`http://localhost:5000/api/blogs/${id}/like`);
            setBlog({ ...blog, likes: data.likes });
            setIsLiked(true);
        } catch (err) {
            console.error(err);
        }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        try {
            const { data } = await axios.post(`http://localhost:5000/api/blogs/${id}/comment`, {
                text: commentText,
                name: commentName || "Anonymous",
            });
            setBlog({ ...blog, comments: data });
            setCommentText("");
            setCommentName("");
        } catch (err) {
            alert("Failed to post comment");
        }
    };

    const handleDelete = async () => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            await axios.delete(`http://localhost:5000/api/blogs/${id}`, config);
            alert("Blog deleted successfully");
            navigate("/blog");
        } catch (err) {
            alert("Failed to delete blog");
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (error) return <div style={styles.error}>{error}</div>;
    if (!blog) return null;

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {blog.image && (
                    <div style={styles.imageContainer}>
                        <img src={blog.image} alt={blog.title} style={styles.image} />
                    </div>
                )}
                <h1 style={styles.title}>{blog.title}</h1>
                <div style={styles.meta}>
                    <span>By {blog.author?.username || "Unknown"}</span>
                    <span>• {new Date(blog.createdAt).toLocaleDateString()}</span>
                    <span>• ❤️ {blog.likes}</span>
                </div>

                <div style={styles.body}>{blog.content}</div>

                <div style={styles.actions}>
                    {/* Show Delete Button if User is Author or Admin */}
                    {user && (user._id === blog.author?._id || user.role === "admin") && (
                        <button onClick={handleDelete} style={styles.deleteButton}>
                            🗑️ Delete Blog
                        </button>
                    )}

                    <button onClick={handleLike} style={{ ...styles.likeButton, opacity: isLiked ? 0.6 : 1 }}>
                        {isLiked ? "Liked!" : "❤️ Like this Post"}
                    </button>
                </div>
            </div>

            <div style={styles.commentsSection}>
                <h3 style={styles.sectionTitle}>Comments ({blog.comments.length})</h3>

                <form onSubmit={handleComment} style={styles.commentForm}>
                    <input
                        type="text"
                        placeholder="Your Name (Optional)"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="Share your thoughts..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        rows="3"
                        required
                        style={styles.textarea}
                    />
                    <button type="submit" style={styles.commentButton}>Post Comment</button>
                </form>

                <div style={styles.commentList}>
                    {blog.comments.map((comment, index) => (
                        <div key={index} style={styles.comment}>
                            <div style={styles.commentHeader}>
                                <span style={styles.commentAuthor}>{comment.name}</span>
                                <span style={styles.commentDate}>{new Date(comment.createdAt).toLocaleDateString()}</span>
                            </div>
                            <p style={styles.commentText}>{comment.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "0 20px",
        fontFamily: "'Inter', sans-serif",
        color: "#f5f5f5",
    },
    loading: { textAlign: "center", marginTop: "50px", color: "#aaa" },
    error: { textAlign: "center", marginTop: "50px", color: "red" },
    content: {
        background: "#1e1e1e",
        padding: "30px",
        borderRadius: "12px",
        marginBottom: "30px",
    },
    imageContainer: {
        width: "100%",
        height: "400px",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "20px",
    },
    image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    title: {
        fontSize: "2.5rem",
        color: "gold",
        marginBottom: "10px",
    },
    meta: {
        display: "flex",
        gap: "15px",
        color: "#888",
        fontSize: "0.9rem",
        marginBottom: "30px",
        borderBottom: "1px solid #333",
        paddingBottom: "15px",
    },
    body: {
        fontSize: "1.1rem",
        lineHeight: "1.8",
        color: "#ddd",
        whiteSpace: "pre-wrap",
        marginBottom: "30px",
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },
    likeButton: {
        padding: "10px 20px",
        background: "#e74c3c",
        color: "white",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
    },
    deleteButton: {
        padding: "10px 20px",
        background: "#d63031",
        color: "white",
        border: "none",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "1rem",
        fontWeight: "bold",
        marginRight: "15px",
    },
    commentsSection: {
        marginTop: "40px",
    },
    sectionTitle: {
        fontSize: "1.5rem",
        marginBottom: "20px",
        color: "#f5f5f5",
    },
    commentForm: {
        background: "#222",
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "30px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
    },
    input: {
        padding: "10px",
        background: "#333",
        border: "1px solid #444",
        borderRadius: "4px",
        color: "white",
        outline: "none",
    },
    textarea: {
        padding: "10px",
        background: "#333",
        border: "1px solid #444",
        borderRadius: "4px",
        color: "white",
        outline: "none",
        resize: "vertical",
    },
    commentButton: {
        alignSelf: "flex-end",
        padding: "8px 20px",
        background: "gold",
        color: "black",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontWeight: "bold",
    },
    commentList: {
        display: "flex",
        flexDirection: "column",
        gap: "15px",
    },
    comment: {
        background: "#1a1a1a",
        padding: "15px",
        borderRadius: "8px",
        borderLeft: "3px solid #444",
    },
    commentHeader: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "8px",
    },
    commentAuthor: {
        fontWeight: "bold",
        color: "gold",
    },
    commentDate: {
        fontSize: "0.8rem",
        color: "#666",
    },
    commentText: {
        color: "#ccc",
        lineHeight: "1.4",
    },
};

export default BlogDetail;
