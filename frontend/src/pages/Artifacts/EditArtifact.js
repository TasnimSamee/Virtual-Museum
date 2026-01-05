import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import API_BASE_URL from "../../config/apiConfig";

function EditArtifact() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        name: "",
        gallery: "",
        description: "",
        period: "",
        image: null,
        imageUrl: "",
        model3D: "",
    });
    const [galleries, setGalleries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageInputType, setImageInputType] = useState("url"); // Default to URL for editing
    const [currentImage, setCurrentImage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch galleries
                const { data: galleriesData } = await axios.get(`${API_BASE_URL}/api/galleries`);
                setGalleries(galleriesData);

                // Fetch artifact data by ID
                const { data: artifactData } = await axios.get(`${API_BASE_URL}/api/artifacts/id/${id}`);
                setFormData({
                    name: artifactData.name,
                    gallery: artifactData.gallery,
                    description: artifactData.description,
                    period: artifactData.period,
                    image: null,
                    imageUrl: artifactData.image || "",
                    model3D: artifactData.model3D || "",
                });
                setCurrentImage(artifactData.image);
            } catch (err) {
                console.error("Failed to fetch data", err);
                alert("Failed to load artifact data");
            }
        };
        fetchData();
    }, [id]);

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

            await axios.put(`${API_BASE_URL}/api/artifacts/${id}`, formPayload, config);
            alert("Artifact updated successfully!");
            navigate(`/galleries/${formData.gallery}`);
        } catch (err) {
            console.error("Update error:", err);
            alert("Failed to update artifact");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Edit Artifact</h2>
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
                    {currentImage && (
                        <div style={styles.currentImagePreview}>
                            <small style={{ color: "#aaa" }}>Current: {currentImage}</small>
                        </div>
                    )}
                    <div style={styles.toggleContainer}>
                        <button
                            type="button"
                            onClick={() => setImageInputType("file")}
                            style={{
                                ...styles.toggleButton,
                                ...(imageInputType === "file" ? styles.toggleButtonActive : {}),
                            }}
                        >
                            Upload New File
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
                            style={styles.input}
                        />
                    ) : (
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
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
                        {loading ? "Updating..." : "Update Artifact"}
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
    currentImagePreview: { padding: "8px", background: "#2c2c2c", borderRadius: "4px", marginBottom: "8px" },
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

export default EditArtifact;
