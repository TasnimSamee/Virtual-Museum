import React, { useState } from "react";
import axios from "axios";

function LoginModal({ isOpen, onClose }) {
    const [activeTab, setActiveTab] = useState("user");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", {
                email: formData.email,
                password: formData.password,
            });

            // Check if role matches the active tab (optional security/UX step)
            if (data.role !== activeTab) {
                setError(`This account is not a ${activeTab} account.`);
                setLoading(false);
                return;
            }

            localStorage.setItem("userInfo", JSON.stringify(data));
            alert(`Logged in as ${data.username} (${data.role})`);
            onClose();
            window.location.reload(); // To update UI based on login status
        } catch (err) {
            setError(
                err.response && err.response.data.message
                    ? err.response.data.message
                    : "Login failed"
            );
        } finally {
            setLoading(false);
        }
    };

    const modalStyle = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    };

    const contentStyle = {
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        width: "400px",
        position: "relative",
        color: "black",
    };

    const tabStyle = (tab) => ({
        flex: 1,
        padding: "10px",
        cursor: "pointer",
        borderBottom: activeTab === tab ? "2px solid blue" : "1px solid #ddd",
        fontWeight: activeTab === tab ? "bold" : "normal",
        textAlign: "center",
    });

    return (
        <div style={modalStyle}>
            <div style={contentStyle}>
                <button
                    onClick={onClose}
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        background: "none",
                        border: "none",
                        fontSize: "16px",
                        cursor: "pointer",
                    }}
                >
                    X
                </button>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                    <div style={tabStyle("user")} onClick={() => setActiveTab("user")}>
                        User Login
                    </div>
                    <div style={tabStyle("admin")} onClick={() => setActiveTab("admin")}>
                        Admin Login
                    </div>
                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: "8px" }}
                    />
                    <div style={{ position: "relative" }}>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ padding: "8px", width: "100%", boxSizing: "border-box" }}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                cursor: "pointer",
                                fontSize: "18px",
                            }}
                        >
                            {showPassword ? "👁️" : "🙈"}
                        </span>
                    </div>
                    <button type="submit" disabled={loading} style={{ padding: "10px", backgroundColor: "#333", color: "white", border: "none", cursor: "pointer" }}>
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginModal;
