import { useEffect, Suspense, lazy } from 'react';
import Lenis from 'lenis';
import BrutalLayout from './components/layout/BrutalLayout';
import BrutalHero from './components/sections/BrutalHero';
import Footer from './components/layout/Footer';
import ErrorBoundary from './components/layout/ErrorBoundary';
import SectionLoader from './components/ui/SectionLoader';
import './styles/grimoire-animation.css';

// Lazy load heavy section components
const About = lazy(() => import('./components/sections/About'));
const Skills = lazy(() => import('./components/sections/Skills'));
const Projects = lazy(() => import('./components/sections/Projects'));
const Journey = lazy(() => import('./components/sections/Journey'));
const GitHubActivity = lazy(() => import('./components/sections/GitHubActivity'));
const DesertHorse = lazy(() => import('./components/sections/DesertHorse'));
const Contact = lazy(() => import('./components/sections/Contact'));



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
      <BrutalLayout>
        {/* Hero */}
        <BrutalHero />

        {/* Main content */}
        <main className="manga-page" id="home">
          <Suspense fallback={<SectionLoader />}>
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
