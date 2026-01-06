import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("Failed to send.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error connecting to server.");
    }
  };

  return (
    <div style={{ padding: "40px", maxWidth: "600px", margin: "0 auto" }}>
      <h2>Contact Us</h2>
      {status && <p style={{ color: status.includes("Error") ? "red" : "green" }}>{status}</p>}
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={{ padding: "10px" }} />
        <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={{ padding: "10px" }} />
        <textarea name="message" placeholder="Message" rows="5" value={formData.message} onChange={handleChange} required style={{ padding: "10px" }} />
        <button type="submit" style={{ padding: "10px", background: "#333", color: "white", border: "none", cursor: "pointer" }}>Send Message</button>
      </form>
    </div>
  );
}

export default Contact;