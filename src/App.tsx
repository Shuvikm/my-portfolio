import { useEffect, useState } from 'react';
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
import MangaIntro from './components/MangaIntro';
import MangaGallery from './components/MangaGallery';
import MangaPanelPortfolio from './components/MangaPanelPortfolio';
import './manga-panels.css';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [viewMode, setViewMode] = useState<'original' | 'manga'>('manga');

  useEffect(() => {
    // Initialize Lenis smooth scroll with enhanced settings
    const lenis = new Lenis({
      duration: 1.5, // Smoother, longer scroll duration
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
      smoothWheel: true,
      wheelMultiplier: 1.2, // Slightly faster wheel scrolling
      touchMultiplier: 2, // Better touch responsiveness
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Smooth scroll for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, {
              offset: -80, // Account for fixed navigation
              duration: 1.5,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div className="min-h-screen relative" style={{ background: '#ffffff' }}>
      {/* Manga Intro Slideshow */}
      {showIntro && <MangaIntro onComplete={() => setShowIntro(false)} />}

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

      {/* Portfolio Toggle Button */}
      <div className="portfolio-toggle">
        <button
          className={`toggle-btn ${viewMode === 'manga' ? 'active' : ''}`}
          onClick={() => setViewMode('manga')}
        >
          📖 Manga
        </button>
        <button
          className={`toggle-btn ${viewMode === 'original' ? 'active' : ''}`}
          onClick={() => setViewMode('original')}
        >
          🎮 Original
        </button>
      </div>

      {/* Manga Panel Portfolio View */}
      {viewMode === 'manga' && (
        <>
          <Navigation />
          <MangaPanelPortfolio />
          <MangaTimer />
        </>
      )}

      {/* Original Portfolio View */}
      {viewMode === 'original' && (
        <>
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
            {/* Manga Gallery - Browse favorite panels */}
            <div className="content-section">
              <MangaGallery />
            </div>

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
        </>
      )}
    </div>
  );
}

export default App;
