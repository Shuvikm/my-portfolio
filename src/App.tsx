import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import MangaTimer from './components/MangaTimer';
import MangaScene3D from './components/MangaScene3D';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#f5f5f5' }}>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1a1a1a',
            color: '#fafaff',
            border: '2px solid #fbbf24',
            fontWeight: 'bold',
          },
        }}
      />

      {/* Three.js Manga Effects Background */}
      <MangaScene3D />

      <Navigation />

      {/* Hero Section with Parallax */}
      <div className="parallax parallax-hero">
        <div className="manga-page">
          <Hero />
        </div>
      </div>

      {/* Content Sections - Aligned */}
      <main className="manga-page">
        <div className="content-section">
          <About />
          <Skills />
        </div>

        {/* Parallax Divider with Manga Style */}
        <div className="parallax parallax-projects">
          <div className="parallax-content">
            <h3 className="manga-title text-4xl text-center" style={{ textShadow: '2px 2px 0 white, 4px 4px 0 #1a1a1a' }}>
              ⚡ ACTION ⚡
            </h3>
          </div>
        </div>

        <div className="content-section">
          <Projects />
          <Journey />
        </div>

        {/* Parallax Divider with Manga Style */}
        <div className="parallax parallax-contact">
          <div className="parallax-content">
            <h3 className="manga-title text-4xl text-center" style={{ textShadow: '2px 2px 0 white, 4px 4px 0 #1a1a1a' }}>
              💬 CONTACT 💬
            </h3>
          </div>
        </div>

        <div className="content-section">
          <Contact />
        </div>
      </main>

      {/* Manga Reading Timer */}
      <MangaTimer />
    </div>
  );
}

export default App;
