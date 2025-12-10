import React from "react";

export default function Navbar() {
  return (
    <nav>
      <h2>Museum Explorer</h2>
      <div>
        <a href="#" style={{ color: 'white', marginRight: '15px', textDecoration: 'none' }}>Home</a>
        <a href="#" style={{ color: 'white', textDecoration: 'none' }}>About</a>
      </div>
    </nav>
  );
}
