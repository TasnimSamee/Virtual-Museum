import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

function AddArtifact() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const gallerySlug = searchParams.get("gallery");

    const [formData, setFormData] = useState({
        name: "",
        gallery: gallerySlug || "",
        description: "",
        period: "",
        image: null,
        imageUrl: "",
        model3D: "",
    });
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageInputType, setImageInputType] = useState("file"); // "file" or "url"

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                const { data } = await axios.get(`${API_BASE_URL}/api/galleries`);
                setGalleries(data);
            } catch (err) {
                console.error("Failed to fetch galleries");
            }
        };
        fetchGalleries();
    }, []);

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
            formPayload.append("name", formData.name);
            formPayload.append("gallery", formData.gallery);
            formPayload.append("description", formData.description);
            formPayload.append("period", formData.period);
            formPayload.append("model3D", formData.model3D);

            if (imageInputType === "file" && formData.image) {
                formPayload.append("image", formData.image);
            } else if (imageInputType === "url" && formData.imageUrl) {
                formPayload.append("imageUrl", formData.imageUrl);
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.post(`${API_BASE_URL}/api/artifacts`, formPayload, config);
            alert("Artifact added successfully!");
            navigate(`/galleries/${formData.gallery}`);
        } catch (err) {
            alert("Failed to add artifact");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Add New Artifact</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
                <label style={styles.label}>
                    Artifact Name
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required style={styles.input} />
                </label>

                <label style={styles.label}>
                    Gallery
                    <select name="gallery" value={formData.gallery} onChange={handleChange} required style={styles.input}>
                        <option value="">Select a Gallery</option>
                        {galleries.map((g) => (
                            <option key={g._id} value={g.slug}>
                                {g.title}
                            </option>
                        ))}
                    </select>
                </label>

                <label style={styles.label}>
                    Period
                    <input type="text" name="period" value={formData.period} onChange={handleChange} required style={styles.input} placeholder="e.g. 5th Century BC" />
                </label>

                <label style={styles.label}>
                    Description
                    <textarea name="description" value={formData.description} onChange={handleChange} required rows="5" style={styles.textarea} />
                </label>

                <div style={styles.imageSection}>
                    <label style={styles.label}>Image</label>
                    <div style={styles.toggleContainer}>
                        <button
                            type="button"
                            onClick={() => setImageInputType("file")}
                            style={{
                                ...styles.toggleButton,
                                ...(imageInputType === "file" ? styles.toggleButtonActive : {}),
                            }}
                        >
                            Upload File
                        </button>
                        <button
                            type="button"
                            onClick={() => setImageInputType("url")}
                            style={{
                                ...styles.toggleButton,
                                ...(imageInputType === "url" ? styles.toggleButtonActive : {}),
                            }}
                        >
                            Image URL
                        </button>
                    </div>

                    {imageInputType === "file" ? (
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            accept="image/*"
                            required
                            style={styles.input}
                        />
                    ) : (
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="https://example.com/image.jpg"
                        />
                    )}
                </div>

                <label style={styles.label}>
                    3D Model URL (Sketchfab embed link)
                    <input type="text" name="model3D" value={formData.model3D} onChange={handleChange} style={styles.input} placeholder="https://sketchfab.com/models/.../embed" />
                </label>

                <div style={styles.actions}>
                    <button type="submit" style={styles.submitButton} disabled={loading}>
                        {loading ? "Adding..." : "Add Artifact"}
                    </button>
                    <button type="button" onClick={() => navigate(-1)} style={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

const styles = {
    container: { maxWidth: "800px", margin: "40px auto", padding: "30px", background: "#1e1e1e", borderRadius: "12px", color: "white", fontFamily: "'Inter', sans-serif" },
    title: { textAlign: "center", marginBottom: "30px", color: "gold" },
    form: { display: "flex", flexDirection: "column", gap: "20px" },
    label: { display: "flex", flexDirection: "column", gap: "8px", fontWeight: "bold", color: "#ccc" },
    input: { padding: "12px", background: "#2c2c2c", border: "1px solid #444", borderRadius: "6px", color: "white", fontSize: "1rem" },
    textarea: { padding: "12px", background: "#2c2c2c", border: "1px solid #444", borderRadius: "6px", color: "white", fontSize: "1rem", resize: "vertical" },
    imageSection: { display: "flex", flexDirection: "column", gap: "12px" },
    toggleContainer: { display: "flex", gap: "10px", marginBottom: "8px" },
    toggleButton: {
        flex: 1,
        padding: "10px",
        background: "#2c2c2c",
        color: "#ccc",
        border: "1px solid #444",
        borderRadius: "6px",
        fontWeight: "bold",
        cursor: "pointer",
        transition: "all 0.3s"
    },
    toggleButtonActive: {
        background: "gold",
        color: "#000",
        border: "1px solid gold"
    },
    actions: { display: "flex", gap: "15px", marginTop: "10px" },
    submitButton: { flex: 1, padding: "12px", background: "#00b894", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
    cancelButton: { flex: 1, padding: "12px", background: "#d63031", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
};

export default AddArtifact;
