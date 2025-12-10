const express = require("express");
const path = require("path");
const app = express();

// Fake artifact data
const artifacts = [
  { id: 1, name: "Golden Bowl", year: "1200 CE", description: "A historic artifact from Silk Road." },
  { id: 2, name: "Ancient Coin", year: "900 CE", description: "Coin used during long-distance trade." }
];

// API route
app.get("/api/artifacts", (req, res) => {
  res.json(artifacts);
});

// Serve frontend build
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

// Catch-all middleware for frontend (modern Express)
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
