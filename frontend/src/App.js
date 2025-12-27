import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
