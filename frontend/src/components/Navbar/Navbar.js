import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Login/LoginModal";

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <>
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
        <Link to="/" style={{ color: "gold", textDecoration: "none" }}>
          <h2 style={{ margin: 0 }}>Virtual Museum</h2>
        </Link>

        <div style={{ display: "flex", gap: "20px" }}>
          <Link to="/galleries" style={{ color: "white", textDecoration: "none" }}>
            Galleries
          </Link>
          <Link to="/about" style={{ color: "white", textDecoration: "none" }}>
            About
          </Link>
          <  Link to="/contact" style={styles.link}>
            Contact
          </Link>
          <Link to="/feedback" style={styles.link}>
            Feedback
          </Link>
          <Link to="/news" style={styles.link}>
            News
          </Link>
          <Link to="/blog" style={styles.link}>
            Blog
          </Link>
          <Link to="/quizzes" style={styles.link}>
            Quizzes
          </Link>
          <Link to="/game" style={styles.link}>
            Game
          </Link>
          {user ? (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Link to="/profile" style={{ color: "gold", textDecoration: "none", fontWeight: "bold" }}>
                {user.username} ({user.role})
              </Link>
              <button onClick={handleLogout} style={{ background: "red", border: "none", color: "white", cursor: "pointer", padding: "5px 10px", borderRadius: "4px" }}>
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsModalOpen(true)}
              style={{ background: "none", border: "none", color: "white", textDecoration: "none", fontSize: "16px", cursor: "pointer", fontFamily: "inherit" }}
            >
              Profile
            </button>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

const styles = {
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "color 0.2s",
  }
};

export default Navbar;


