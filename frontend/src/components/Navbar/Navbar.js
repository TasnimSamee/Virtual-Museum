import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        background: "#111",
        color: "white",
      }}
    >
      <h2>Virtual Museum</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link to="/galleries" style={{ color: "white", textDecoration: "none" }}>
          Galleries
        </Link>
        <Link to="/blog" style={{ color: "white", textDecoration: "none" }}>
          Blog
        </Link>
        <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
          About
        </Link>
        <Link to="/contact" style={{ color: "white", textDecoration: "none" }}>
          Contact
        </Link>
        <Link to="/feedback" style={{ color: "white", textDecoration: "none" }}>
          Feedback
        </Link>
        <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
          Profile
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;


