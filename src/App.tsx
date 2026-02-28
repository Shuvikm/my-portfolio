import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import BrutalLayout from './components/layout/BrutalLayout';
import BrutalHero from './components/sections/BrutalHero';
import ErrorBoundary from './components/layout/ErrorBoundary';
import './styles/grimoire-animation.css';

// Lazy load heavy components for better performance
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Journey = lazy(() => import('./components/sections/Journey'));
const GitHubActivity = lazy(() => import('./components/sections/GitHubActivity'));
const DesertHorse = lazy(() => import('./components/sections/DesertHorse'));
const Contact = lazy(() => import('./components/sections/Contact'));
const GrimoireOrbital = lazy(() => import('./components/features/grimoire/GrimoireOrbital'));
const Ribbons = lazy(() => import('./components/ui/Ribbons'));



function SectionLoader() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#fbbf24] border-t-transparent rounded-full animate-spin" />
      <div className="text-[#fbbf24] font-bold tracking-widest text-sm animate-pulse">LOADING CHAPTER...</div>
    </div>
  );
}

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

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

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
      cancelAnimationFrame(rafId);
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <ErrorBoundary>
      <BrutalLayout overlay={
        <>
          <Suspense fallback={null}>
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 5, pointerEvents: 'none' }}>
              <Ribbons
                baseThickness={20}
                colors={["#fbbf24", "#ffffff", "#dc2626"]}
                speedMultiplier={0.7}
                maxAge={200}
                enableFade={true}
                enableShaderEffect={false}
                pointCount={18}
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
        </>
      }>
        <BrutalHero />

        <section className="section-dark">
          <p className="big-text">
            WE BUILD <span>DIGITAL EXPERIENCES</span> THAT DEFY GRAVITY. NO TEMPLATES. NO LIMITS. JUST <span>PURE
              CODE</span> AND <span>RAW AESTHETICS</span>.
          </p>
        </section>

        <section className="section-dark" style={{ justifyContent: 'flex-end', textAlign: 'right' }}>
          <p className="big-text">
            INTERACTION<br />
            <span>REDEFINED</span>
          </p>
        </section>

        <main className="manga-page">
          <Suspense fallback={<SectionLoader />}>
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
            <About />
            <Skills />
            <Projects />
            <Journey />
            <GitHubActivity />
            <DesertHorse />

            {/* Contact Section Preview */}
            <div className="parallax parallax-contact">
              <div className="parallax-content">
                <h3 className="manga-title text-4xl text-center" style={{ textShadow: '2px 2px 0 white, 4px 4px 0 #1a1a1a' }}>
                  💬 CONTACT 💬
                </h3>
              </div>
            </div>

            <Contact />
          </Suspense>
        </main>

        <footer style={{ height: '40vh', background: 'var(--fg)', color: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <h2 style={{ fontFamily: "'Syncopate'", fontSize: '3rem', marginBottom: '1rem' }}><a href="https://github.com/Shuvikm" style={{ color: 'inherit', textDecoration: 'none' }}>SHUVIK M</a></h2>
          <p>© 2026</p>
        </footer>
      </BrutalLayout>
    </ErrorBoundary>
  );
}

export default App;
