import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CursorLens from './components/CursorLens';
import ClickWeb from './components/ClickWeb';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Life from './components/Life';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BlogVerimcp from './pages/BlogVerimcp';

function Home() {
  return (
    <div className="my-3 mx-2 sm:my-6 sm:mx-6 lg:mx-10 rounded-2xl sm:rounded-[2rem] overflow-hidden relative"
      style={{
        backgroundColor: '#f6f1e7',
        border: '1px dotted rgba(24,20,15,0.3)',
        boxShadow: '0 40px 80px rgba(60,42,20,0.35), 0 10px 26px rgba(60,42,20,0.22)',
      }}>
      <CursorLens />
      <ClickWeb />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Experience />
        <Projects />
        <Blog />
        <Life />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/verimcp" element={<BlogVerimcp />} />
      </Routes>
    </HashRouter>
  );
}
