import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import WebBackground from './components/WebBackground';
import Footer from './components/Footer';
import Home from './pages/Home';
import Work from './pages/Work';
import ProjectsPage from './pages/ProjectsPage';
import WritingPage from './pages/WritingPage';
import BlogVerimcp from './pages/BlogVerimcp';

/* A new page should start at the top, not wherever the last one was scrolled. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

/* The canvas is fixed at z-0, so nothing above it paints an opaque background
   of its own. The page colour lives on <body>. */
function Shell() {
  const { pathname } = useLocation();
  return (
    <div className="min-h-screen">
      <WebBackground />
      <div className="relative z-10">
        <Nav />
        {/* keying on pathname replays the entry fade on every navigation */}
        <main key={pathname} className="max-w-page mx-auto px-5 page-enter">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/writing" element={<WritingPage />} />
            <Route path="/blog/verimcp" element={<BlogVerimcp />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Shell />
    </HashRouter>
  );
}
