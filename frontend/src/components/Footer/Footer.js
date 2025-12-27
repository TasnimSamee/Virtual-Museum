import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h3 className="footer-title">Virtual Museum</h3>

        <ul className="footer-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/galleries">Galleries</Link></li>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/feedback">Feedback</Link></li>
        </ul>

        <p className="footer-copy">
          © {new Date().getFullYear()} Virtual Museum. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;


