import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import GitHubActivity from './components/sections/GitHubActivity';
import DesertHorse from './components/sections/DesertHorse';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './styles/grimoire-animation.css';

// Lazy load heavy components for better performance
const GrimoireOrbital = lazy(() => import('./components/features/grimoire/GrimoireOrbital'));
const Ribbons = lazy(() => import('./components/ui/Ribbons'));

// Import SpiderCursor
import { SpiderCursor } from './components/ui/SpiderCursor';

function App() {
  useEffect(() => {
    // Initialize Lenis smooth scroll with optimized settings
    const lenis = new Lenis({
      duration: 0.8, // Reduced from 1.0 for faster response
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0, // Increased from 0.8 for more direct control
      touchMultiplier: 1.5,
      infinite: false,
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
              offset: -80,
              duration: 1.0, // Reduced from 1.2 for snappier navigation
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
    <ErrorBoundary>
      <div className="min-h-screen relative overflow-x-hidden">
        {/* Spider Symbiote Background - Lowest layer */}
        <SpiderCursor />

        {/* Full-Page Ribbons - Above particles, below content */}
        <Suspense fallback={null}>
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 5, pointerEvents: 'none' }}>
            <Ribbons
              baseThickness={25}
              colors={["#fbbf24", "#ffffff", "#dc2626"]}
              speedMultiplier={0.9}
              maxAge={400}
              enableFade={true}
              enableShaderEffect={false}
              pointCount={30}
            />
          </div>
        </Suspense>

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

        <Navigation />

        {/* Hero Section */}
        <div className="parallax parallax-hero">
          <div className="manga-page">
            <Hero />
          </div>
        </div>

        {/* Main Content */}
        <main className="manga-page">
          <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center"><div className="text-2xl">Loading...</div></div>}>
            <GrimoireOrbital
              images={[
                '/images/grimoire/manga-1.jpg',
                '/images/grimoire/manga-2.jpg',
                '/images/grimoire/manga-3.jpg',
                '/images/grimoire/manga-5.jpg',
                '/images/grimoire/manga-7.jpg',
                '/images/grimoire/manga-9.jpg',
                '/images/grimoire/manga-11.jpg',
                '/images/grimoire/manga-13.jpg',
                '/images/grimoire/manga-15.jpg',
                '/images/grimoire/manga-17.jpg',
                '/images/grimoire/manga-18.jpg',
                '/images/grimoire/manga-19.jpg',
              ]}
              grimoireImage="/images/grimoire/grimoire-book.jpg"
            />
          </Suspense>

          <About />
          <Skills />
          <Projects />
          <Journey />
          <GitHubActivity />
          <DesertHorse />

          {/* Contact Section */}
          <div className="parallax parallax-contact">
            <div className="parallax-content">
              <h3 className="manga-title text-4xl text-center" style={{ textShadow: '2px 2px 0 white, 4px 4px 0 #1a1a1a' }}>
                💬 CONTACT 💬
              </h3>
            </div>
          </div>

          <Contact />
          <Footer />
        </main>
      </div>
    </ErrorBoundary>
  );
}

export default App;
