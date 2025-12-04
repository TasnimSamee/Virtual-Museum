import React from "react";

const ContactPage = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Us</h1>
      <p>If you have any questions about the Virtual Museum project, contact us below.</p>

      <form style={{ maxWidth: "400px", marginTop: "1rem" }}>
        <label>Name:</label>
        <input type="text" placeholder="Your name" style={styles.input} />

        <label>Email:</label>
        <input type="email" placeholder="Your email" style={styles.input} />

        <label>Message:</label>
        <textarea placeholder="Your message" style={styles.textarea}></textarea>

        <button style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default ContactPage;
