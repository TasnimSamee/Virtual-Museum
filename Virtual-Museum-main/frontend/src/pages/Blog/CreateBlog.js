import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

function CreateBlog() {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        image: null,
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
            setLoading(true);
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

            await axios.post("http://localhost:5000/api/blogs", formPayload, config);
            alert("Blog submitted for approval!");
            navigate("/blog");
        } catch (err) {
            alert("Failed to create blog");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Write a new Blog Post</h2>
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
                        placeholder="Enter an engaging title"
                    />
                </label>
                <label style={styles.label}>
                    Upload Image
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
                        rows="10"
                        style={styles.textarea}
                        placeholder="Write your story here..."
                    />
                </label>
                <div style={styles.actions}>
                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {loading ? "Submitting..." : "Submit for Approval"}
                    </button>
                    <button type="button" onClick={() => navigate("/blog")} style={styles.cancelButton}>
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
        outline: "none",
    },
    textarea: {
        padding: "12px",
        background: "#2c2c2c",
        border: "1px solid #444",
        borderRadius: "6px",
        color: "white",
        fontSize: "1rem",
        outline: "none",
        resize: "vertical",
    },
    actions: {
        display: "flex",
        gap: "15px",
        marginTop: "10px",
    },
    submitButton: {
        flex: 1,
        padding: "12px",
        background: "#00b894",
        color: "white",
        border: "none",
        borderRadius: "6px",
        fontSize: "1rem",
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
        fontSize: "1rem",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default CreateBlog;
