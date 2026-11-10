import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import BlogVerimcp from './pages/BlogVerimcp';
import BlogComputerUse from './pages/BlogComputerUse';
import BlogSo101 from './pages/BlogSo101';
import BlogDreamdesk from './pages/BlogDreamdesk';
import BlogJourney from './pages/BlogJourney';

/* Project and blog pages start at the top. The section routes (/projects,
   /work, ...) are all the one home page, which scrolls itself. */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith('/blog') || pathname.startsWith('/projects/')) {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname]);
  return null;
}

function Shell() {
  const { pathname } = useLocation();
  const onHome = !pathname.startsWith('/blog') && !pathname.startsWith('/projects/');

  return (
    <div className="min-h-screen">
      <Nav />
      <main key={onHome ? 'home' : pathname} className="max-w-shell mx-auto px-5 sm:px-8 page-enter">
        <Routes>
          <Route path="/" element={<Home section="top" />} />
          <Route path="/projects" element={<Home section="projects" />} />
          <Route path="/demos" element={<Home section="demos" />} />
          <Route path="/work" element={<Home section="internships" />} />
          <Route path="/writing" element={<Home section="writing" />} />
          <Route path="/journey" element={<Home section="journey" />} />
          <Route path="/life" element={<Home section="life" />} />
          <Route path="/projects/:id" element={<ProjectPage />} />
          <Route path="/blog/verimcp" element={<BlogVerimcp />} />
          <Route path="/blog/computer-use" element={<BlogComputerUse />} />
          <Route path="/blog/so101" element={<BlogSo101 />} />
          <Route path="/blog/dreamdesk" element={<BlogDreamdesk />} />
          <Route path="/blog/computer-use-journey" element={<BlogJourney />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
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
