import { HashRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
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

function Shell({ children }) {
  return (
    <div className="min-h-screen bg-base">
      <Nav />
      <main className="max-w-page mx-auto px-5">{children}</main>
      <Footer />
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
