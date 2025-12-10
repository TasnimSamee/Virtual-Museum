import React from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import "./styles.css";  // Import the CSS here

export default function App() {
  return (
    <>
      <Navbar />
      <Home />
    </>
  );
}
