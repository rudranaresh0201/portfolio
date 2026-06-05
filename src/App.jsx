import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Life from './components/Life';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#07070f' }}>
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Life />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
