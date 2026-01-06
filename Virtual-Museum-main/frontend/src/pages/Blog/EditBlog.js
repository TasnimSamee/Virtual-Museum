import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL, { getImageUrl } from "../../config/apiConfig";

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null,
    });
    const [existingImage, setExistingImage] = useState("");
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
        try {
            const { data } = await axios.get(`${API_BASE_URL}/api/blogs/${id}`);
            setFormData({
                title: data.title,
                content: data.content,
                image: null,
            });
            setExistingImage(data.image);
            setLoading(false);
        } catch (err) {
            alert("Failed to fetch blog details");
            navigate("/blog");
        }
    };

    const handleChange = (e) => {
        if (e.target.name === "image") {
            setFormData({ ...formData, image: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSubmitting(true);
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const formPayload = new FormData();
            formPayload.append("title", formData.title);
            formPayload.append("content", formData.content);
            if (formData.image) {
                formPayload.append("image", formData.image);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.put(`${API_BASE_URL}/api/blogs/${id}`, formPayload, config);
            alert("Blog updated successfully!");
            navigate(`/blog/${id}`);
        } catch (err) {
            alert("Failed to update blog");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Edit Blog Post</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Title
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Image
                    {existingImage && !formData.image && (
                        <div style={styles.previewContainer}>
                            <p style={styles.previewLabel}>Current Image:</p>
                            <img src={getImageUrl(existingImage)} alt="Current" style={styles.previewImage} />
                        </div>
                    )}
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        style={styles.input}
                    />
                </label>

                <label style={styles.label}>
                    Content
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows="15"
                        style={styles.textarea}
                    />
                </label>

                <div style={styles.actions}>
                    <button type="submit" style={styles.submitButton} disabled={submitting}>
                        {submitting ? "Updating..." : "Update Blog"}
                    </button>
                    <button type="button" onClick={() => navigate(`/blog/${id}`)} style={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: {
        maxWidth: "800px",
        margin: "40px auto",
        padding: "30px",
        background: "#1e1e1e",
        borderRadius: "12px",
        color: "white",
        fontFamily: "'Inter', sans-serif",
    },
    title: {
        textAlign: "center",
        marginBottom: "30px",
        color: "gold",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    label: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        fontWeight: "bold",
        color: "#ccc",
    },
    input: {
        padding: "12px",
        background: "#2c2c2c",
        border: "1px solid #444",
        borderRadius: "6px",
        color: "white",
        fontSize: "1rem",
    },
    textarea: {
        padding: "12px",
        background: "#2c2c2c",
        border: "1px solid #444",
        borderRadius: "6px",
        color: "white",
        fontSize: "1rem",
        resize: "vertical",
    },
    previewContainer: {
        marginBottom: "10px",
    },
    previewLabel: {
        fontSize: "0.8rem",
        color: "#888",
        marginBottom: "5px",
    },
    previewImage: {
        width: "150px",
        height: "100px",
        objectFit: "cover",
        borderRadius: "4px",
        border: "1px solid #444",
    },
    actions: {
        display: "flex",
        gap: "15px",
    },
    submitButton: {
        flex: 1,
        padding: "12px",
        background: "#00b894",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    cancelButton: {
        flex: 1,
        padding: "12px",
        background: "#d63031",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
    },
    loading: { textAlign: "center", marginTop: "50px", color: "#aaa" },
};

export default EditBlog;
