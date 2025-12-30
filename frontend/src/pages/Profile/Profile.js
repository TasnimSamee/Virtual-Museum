import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Profile() {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        bio: "",
        interests: "",
        profilePicture: null,
    });
    const [previewUrl, setPreviewUrl] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [isPictureRemoved, setIsPictureRemoved] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem("userInfo"));
                if (!userInfo) return;

                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };

                const { data } = await axios.get("http://localhost:5000/api/users/profile", config);

                setUser(data);
                setFavorites(data.favorites || []);
                // Initialize form data (profilePicture kept null to track new uploads)
                setFormData({
                    username: data.username,
                    bio: data.bio || "",
                    interests: data.interests ? data.interests.join(", ") : "",
                    profilePicture: null
                });
                setPreviewUrl(data.profilePicture || "");
                setLoading(false);
            } catch (err) {
                setError("Failed to fetch profile");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleChange = (e) => {
        if (e.target.name === "profilePicture") {
            const file = e.target.files[0];
            setFormData({ ...formData, profilePicture: file });
            setPreviewUrl(URL.createObjectURL(file));
            setIsPictureRemoved(false);
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleRemovePicture = () => {
        setPreviewUrl("");
        setFormData({ ...formData, profilePicture: null });
        setIsPictureRemoved(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));

            const updateFormData = new FormData();
            updateFormData.append("username", formData.username);
            updateFormData.append("bio", formData.bio);
            updateFormData.append("interests", formData.interests); // Controller splits this string

            if (formData.profilePicture) {
                updateFormData.append("profilePicture", formData.profilePicture);
            } else if (isPictureRemoved) {
                updateFormData.append("profilePicture", "");
            }

            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put("http://localhost:5000/api/users/profile", updateFormData, config);

            setUser(data);
            localStorage.setItem("userInfo", JSON.stringify({ ...data, token: userInfo.token }));
            setIsEditing(false);
            setIsPictureRemoved(false);
            alert("Profile updated successfully!");
        } catch (err) {
            alert("Failed to update profile");
            console.error(err);
        }
    };

    if (loading) return <div style={styles.loading}>Loading...</div>;
    if (!user) return <div style={styles.loading}>Please login to view profile.</div>;

    return (
        <div style={styles.container}>
            {isEditing ? (
                <div style={styles.editCard}>
                    <h2 style={styles.editTitle}>Edit Your Profile</h2>
                    <form onSubmit={handleSubmit} style={styles.form}>

                        {/* Profile Picture Upload */}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Profile Picture</label>
                            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                                <div style={styles.previewContainer}>
                                    {previewUrl ? (
                                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                                            <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                                            <button
                                                type="button"
                                                onClick={handleRemovePicture}
                                                style={styles.removeButton}
                                                title="Remove Picture"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ) : (
                                        <div style={styles.previewPlaceholder}>?</div>
                                    )}
                                </div>
                                <input
                                    type="file"
                                    name="profilePicture"
                                    onChange={handleChange}
                                    accept="image/*"
                                    style={{ color: "#ccc" }}
                                />
                            </div>
                        </div>

                        {/* Username */}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("username")}
                                onBlur={() => setFocusedField(null)}
                                style={{
                                    ...styles.input,
                                    border: focusedField === "username" ? "2px solid #6c5ce7" : "1px solid #444",
                                }}
                            />
                        </div>

                        {/* Bio */}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Bio</label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                rows="4"
                                onFocus={() => setFocusedField("bio")}
                                onBlur={() => setFocusedField(null)}
                                style={{
                                    ...styles.textarea,
                                    border: focusedField === "bio" ? "2px solid #6c5ce7" : "1px solid #444",
                                }}
                            />
                        </div>

                        {/* Interests */}
                        <div style={styles.inputGroup}>
                            <label style={styles.label}>Interests (comma separated)</label>
                            <input
                                type="text"
                                name="interests"
                                value={formData.interests}
                                onChange={handleChange}
                                onFocus={() => setFocusedField("interests")}
                                onBlur={() => setFocusedField(null)}
                                style={{
                                    ...styles.input,
                                    border: focusedField === "interests" ? "2px solid #6c5ce7" : "1px solid #444",
                                }}
                            />
                        </div>

                        <div style={styles.buttonGroup}>
                            <button type="submit" style={styles.saveButton}>Save Changes</button>
                            <button type="button" onClick={() => setIsEditing(false)} style={styles.cancelButton}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                <>
                    {/* Header Section */}
                    <div style={styles.header}>
                        <div style={styles.avatarContainer}>
                            {user.profilePicture ? (
                                <img src={user.profilePicture} alt="Profile" style={styles.avatar} />
                            ) : (
                                <div style={styles.avatarPlaceholder}>{user.username.charAt(0).toUpperCase()}</div>
                            )}
                        </div>
                        <div style={styles.headerInfo}>
                            <h1 style={styles.username}>{user.username}</h1>
                            <p style={styles.role}>{user.role === 'admin' ? 'Curator' : 'Explorer'}</p>
                            <div style={{ margin: "20px 0", background: "#333", padding: "15px", borderRadius: "8px" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                                    <span style={{ color: "gold", fontSize: "1.5rem" }}>🏆</span>
                                    <div>
                                        <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Points</span>
                                        <div style={{ color: "white", fontSize: "1.2rem", fontWeight: "bold" }}>{user.points || 0}</div>
                                    </div>
                                </div>
                                <div>
                                    <span style={{ color: "#aaa", fontSize: "0.9rem" }}>Badges</span>
                                    <div style={{ display: "flex", gap: "5px", flexWrap: "wrap", marginTop: "5px" }}>
                                        {user.badges && user.badges.length > 0 ? (
                                            user.badges.map((badge, i) => (
                                                <span key={i} style={{ background: "gold", color: "black", padding: "4px 8px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: "bold" }}>
                                                    {badge}
                                                </span>
                                            ))
                                        ) : (
                                            <span style={{ color: "#666", fontSize: "0.8rem", fontStyle: "italic" }}>No badges yet. Start taking quizzes!</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsEditing(true)} style={styles.editButton}>
                                Edit Profile
                            </button>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div style={styles.contentGrid}>
                        {/* About Card */}
                        <div style={styles.card}>
                            <h3 style={styles.cardTitle}>About</h3>
                            <p style={styles.bioText}>{user.bio || "No bio added yet. Tell us about yourself!"}</p>

                            <h4 style={styles.subTitle}>Interests</h4>
                            <div style={styles.tagContainer}>
                                {user.interests && user.interests.length > 0 ? (
                                    user.interests.map((interest, index) => (
                                        <span key={index} style={styles.tag}>{interest}</span>
                                    ))
                                ) : (
                                    <p style={styles.emptyText}>No interests listed.</p>
                                )}
                            </div>
                        </div>

                        {/* Favorites Card or Admin Dashboard */}
                        {user.role === 'admin' ? (
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>Admin Dashboard</h3>
                                <div style={{ display: "grid", gap: "15px" }}>

                                    {/* Feature 1: Manage Galleries & Blogs */}
                                    <div style={{ background: "#222", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #00cec9" }}>
                                        <h4 style={{ margin: "0 0 5px 0", color: "#f5f5f5" }}>Manage Content</h4>
                                        <p style={{ fontSize: "0.9rem", color: "#aaa", marginBottom: "10px" }}>Manage museum artifacts and pending blogs.</p>
                                        <div style={{ display: "flex", gap: "15px" }}>
                                            <Link to="/galleries" style={{ ...styles.link, color: "#00cec9", fontWeight: "bold" }}>Galleries &rarr;</Link>
                                            <Link to="/admin/blogs" style={{ ...styles.link, color: "#a29bfe", fontWeight: "bold" }}>Review Blogs &rarr;</Link>
                                        </div>
                                    </div>

                                    {/* Feature 2: View Feedback */}
                                    <div style={{ background: "#222", padding: "15px", borderRadius: "8px", borderLeft: "4px solid #fdcb6e" }}>
                                        <h4 style={{ margin: "0 0 5px 0", color: "#f5f5f5" }}>Visitor Feedback</h4>
                                        <p style={{ fontSize: "0.9rem", color: "#aaa", marginBottom: "10px" }}>Review comments and suggestions from visitors.</p>
                                        <Link to="/feedback" style={{ ...styles.link, color: "#fdcb6e", fontWeight: "bold" }}>Review &rarr;</Link>
                                    </div>

                                </div>
                            </div>
                        ) : (
                            <div style={styles.card}>
                                <h3 style={styles.cardTitle}>My Collection</h3>
                                <div style={styles.favoritesGrid}>
                                    {favorites.length > 0 ? (
                                        favorites.map((fav) => (
                                            <Link to={`/galleries/${fav.slug}`} key={fav._id} style={styles.favoriteItem}>
                                                <div style={styles.favoriteImageContainer}>
                                                    <img src={fav.imageUrl} alt={fav.name} style={styles.favoriteImage} />
                                                </div>
                                                <p style={styles.favoriteName}>{fav.name}</p>
                                            </Link>
                                        ))
                                    ) : (
                                        <div style={styles.emptyState}>
                                            <p style={styles.emptyText}>No favorites yet.</p>
                                            <Link to="/galleries" style={styles.link}>Explore Galleries</Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </>
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
    loading: {
        textAlign: "center",
        padding: "50px",
        fontSize: "1.2rem",
        color: "#aaa",
    },
    header: {
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #2d3436 0%, #000000 74%)",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
        marginBottom: "30px",
        gap: "30px",
    },
    avatarContainer: {
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        border: "4px solid #gold", // Adjusted below
        boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        overflow: "hidden",
        backgroundColor: "#222",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexShrink: 0,
    },
    avatar: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    avatarPlaceholder: {
        fontSize: "3rem",
        color: "#555",
        fontWeight: "bold",
    },
    headerInfo: {
        flex: 1,
    },
    username: {
        fontSize: "2.5rem",
        margin: "0 0 10px 0",
        fontWeight: "700",
        background: "linear-gradient(to right, #fff, #aaa)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
    },
    role: {
        fontSize: "1rem",
        color: "#888",
        textTransform: "uppercase",
        letterSpacing: "1px",
        marginBottom: "20px",
    },
    editButton: {
        padding: "10px 24px",
        background: "transparent",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        color: "white",
        borderRadius: "30px",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.3s ease",
    },
    contentGrid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px",
    },
    card: {
        background: "#1a1a1a",
        padding: "30px",
        borderRadius: "16px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    },
    cardTitle: {
        margin: "0 0 20px 0",
        fontSize: "1.4rem",
        color: "gold",
        borderBottom: "1px solid #333",
        paddingBottom: "10px",
    },
    bioText: {
        lineHeight: "1.6",
        color: "#ccc",
        marginBottom: "20px",
        fontSize: "1rem",
    },
    subTitle: {
        fontSize: "1.1rem",
        marginBottom: "15px",
        color: "#ddd",
    },
    tagContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "10px",
    },
    tag: {
        background: "rgba(255, 255, 255, 0.1)",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "0.85rem",
        color: "#eee",
    },
    favoritesGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
        gap: "15px",
    },
    favoriteItem: {
        textDecoration: "none",
        color: "white",
        transition: "transform 0.2s",
    },
    favoriteImageContainer: {
        width: "100%",
        aspectRatio: "1/1",
        borderRadius: "8px",
        overflow: "hidden",
        marginBottom: "8px",
    },
    favoriteImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    favoriteName: {
        fontSize: "0.85rem",
        textAlign: "center",
        color: "#aaa",
        margin: 0,
    },
    emptyState: {
        gridColumn: "1 / -1",
        textAlign: "center",
        padding: "20px",
    },
    emptyText: {
        color: "#666",
        marginBottom: "10px",
    },
    link: {
        color: "gold",
        textDecoration: "none",
        fontSize: "0.9rem",
    },

    // Edit Form Styles
    editCard: {
        background: "#1e1e1e",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 10px 40px rgba(0,0,0,0.6)",
    },
    editTitle: {
        textAlign: "center",
        marginBottom: "30px",
        color: "white",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    label: {
        fontSize: "0.9rem",
        color: "#bbb",
        fontWeight: "500",
    },
    input: {
        background: "#2c2c2c",
        padding: "12px",
        borderRadius: "8px",
        color: "white",
        fontSize: "1rem",
        outline: "none",
    },
    textarea: {
        background: "#2c2c2c",
        padding: "12px",
        borderRadius: "8px",
        color: "white",
        fontSize: "1rem",
        outline: "none",
        resize: "vertical",
    },
    previewContainer: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        overflow: "hidden",
        background: "#333",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    previewImage: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
    },
    previewPlaceholder: {
        color: "#666",
        fontSize: "1.2rem",
    },
    buttonGroup: {
        display: "flex",
        gap: "15px",
        marginTop: "10px",
    },
    saveButton: {
        flex: 1,
        padding: "12px",
        background: "linear-gradient(to right, #6c5ce7, #a29bfe)",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
    cancelButton: {
        flex: 1,
        padding: "12px",
        background: "#444",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
    },
    removeButton: {
        position: "absolute",
        top: 0,
        right: 0,
        background: "rgba(255, 0, 0, 0.7)",
        color: "white",
        border: "none",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        lineHeight: "1",
    },

};

export default Profile;
