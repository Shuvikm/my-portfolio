import { useEffect, lazy, Suspense } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import BrutalLayout from './components/layout/BrutalLayout';
import BrutalHero from './components/sections/BrutalHero';
import Footer from './components/layout/Footer';
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

// All manga panels that exist in public/images/grimoire
const MANGA_IMAGES = [
  '/images/grimoire/manga-1.jpg',
  '/images/grimoire/manga-2.jpg',
  '/images/grimoire/manga-3.jpg',
  '/images/grimoire/manga-4.jpg',
  '/images/grimoire/manga-5.jpg',
  '/images/grimoire/manga-6.jpg',
  '/images/grimoire/manga-7.jpg',
  '/images/grimoire/manga-8.jpg',
  '/images/grimoire/manga-9.jpg',
  '/images/grimoire/manga-10.jpg',
  '/images/grimoire/manga-11.jpg',
  '/images/grimoire/manga-12.jpg',
  '/images/grimoire/manga-13.jpg',
  '/images/grimoire/manga-14.jpg',
  '/images/grimoire/manga-15.jpg',
  '/images/grimoire/manga-16.jpg',
  '/images/grimoire/manga-17.jpg',
  '/images/grimoire/manga-18.jpg',
  '/images/grimoire/manga-19.jpg',
];

function SectionLoader() {
  return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-[#fbbf24] border-t-transparent rounded-full animate-spin" />
      <div className="text-[#fbbf24] font-bold tracking-widest text-sm animate-pulse">LOADING...</div>
    </div>
  );
}

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 2.0,
      infinite: false,
      syncTouch: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      if (anchor) {
        e.preventDefault();
        const href = anchor.getAttribute('href');
        if (href) {
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element as HTMLElement, { offset: -80, duration: 1.0 });
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
        {/* Hero */}
        <BrutalHero />

        {/* Main content */}
        <main className="manga-page" id="home">
          <Suspense fallback={<SectionLoader />}>
            {/* Manga Grimoire Panel — restored! */}
            <GrimoireOrbital
              images={MANGA_IMAGES}
              grimoireImage="/images/grimoire/grimoire-book.jpg"
            />
            <About />
            <Skills />
            <Projects />
            <Journey />
            <GitHubActivity />
            <DesertHorse />
            <Contact />
          </Suspense>
        </main>

        <Footer />
      </BrutalLayout>
    </ErrorBoundary>
  );
}

export default App;
