import { BrowserRouter, Routes, Route } from 'react-router-dom';
import News from './pages/News';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/news" element={<News />} />
        <Route path="/news/:slug" element={<PostDetail />} />
        
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<PostDetail />} />
        
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<PostDetail />} />
      </Routes>
    </BrowserRouter>
  );
}