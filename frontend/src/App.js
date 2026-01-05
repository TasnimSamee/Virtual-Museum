import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Galleries from "./pages/Galleries/Galleries";
import Home from "./pages/Home/Home";
import Feedback from "./pages/Feedback/Feedback";
import News from "./pages/News/News";
import Artifacts from "./pages/Artifacts/Artifacts";
import ArtifactDetail from "./pages/Artifacts/ArtifactDetail";
import Profile from "./pages/Profile/Profile";
import Blog from "./pages/Blog/Blog";
import BlogDetail from "./pages/Blog/BlogDetail";
import CreateBlog from "./pages/Blog/CreateBlog";
import AdminBlogList from "./pages/Blog/AdminBlogList";
import QuizList from "./pages/Quiz/QuizList";
import QuizPage from "./pages/Quiz/QuizPage";
import CreateQuiz from "./pages/Quiz/CreateQuiz";
import ChatBot from './components/ChatBot/ChatBot';

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/news" element={< News />} />
        <Route path="/galleries" element={<Galleries />} />
        <Route path="/galleries/:slug" element={<Artifacts />} />
        <Route path="/artifacts/:slug" element={<ArtifactDetail />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/blog/create" element={<CreateBlog />} />
        <Route path="/admin/blogs" element={<AdminBlogList />} />
        <Route path="/quizzes" element={<QuizList />} />
        <Route path="/quiz/create" element={<CreateQuiz />} />
        <Route path="/quiz/:id" element={<QuizPage />} />
      </Routes>
      <ChatBot />
      <Footer />
    </Router>
  );
}

export default App;
