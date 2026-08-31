import { HashRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import WebBackground from './components/WebBackground';
import Hero from './components/Hero';
import Receipts from './components/Receipts';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Writing from './components/Writing';
import About from './components/About';
import Footer from './components/Footer';
import BlogVerimcp from './pages/BlogVerimcp';

function Home() {
  return (
    <>
      <Hero />
      <Receipts />
      <Experience />
      <Projects />
      <Writing />
      <About />
    </>
  );
}

/* The canvas is fixed at z-0, so nothing above it may paint an opaque
   background of its own. The page colour lives on <body> instead. */
function Shell({ children }) {
  return (
    <div className="min-h-screen">
      <WebBackground />
      <div className="relative z-10">
        <Nav />
        <main className="max-w-page mx-auto px-5">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Shell><Home /></Shell>} />
        <Route path="/blog/verimcp" element={<Shell><BlogVerimcp /></Shell>} />
      </Routes>
    </HashRouter>
  );
}
