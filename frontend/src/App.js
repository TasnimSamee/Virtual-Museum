import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Galleries from "./pages/Galleries/Galleries";
import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";
import Artifacts from "./pages/Artifacts/Artifacts";
import ArtifactDetail from "./pages/Artifacts/ArtifactDetail";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/galleries/:slug" element={<Artifacts />} />
        <Route path="/artifacts/:slug" element={<ArtifactDetail />} />

      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
