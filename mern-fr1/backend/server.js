const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const artifactRoutes = require("./routes/artifacts");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/virtualMuseum", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/api/artifacts", artifactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
