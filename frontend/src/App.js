import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";
import Profile from "./pages/Profile/Profile";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import CreateBlog from "./pages/Blog/CreateBlog";
import AdminBlogList from "./pages/Blog/AdminBlogList";
import QuizList from "./pages/Quiz/QuizList";
import QuizPage from "./pages/Quiz/QuizPage";
import CreateQuiz from "./pages/Quiz/CreateQuiz";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/admin/blogs" element={<AdminBlogList />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
