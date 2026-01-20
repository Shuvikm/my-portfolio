import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Lenis from 'lenis';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';
import GrimoireOrbital from './components/ui/GrimoireOrbital';
import Footer from './components/layout/Footer';
import ParticlesBackground from './components/ui/Particles/ParticlesBackground';
import ScrollStack, { ScrollStackItem } from './components/ui/ScrollStack';
import './styles/grimoire-animation.css';

function App() {
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
    <div className="min-h-screen relative overflow-x-hidden">
      <ParticlesBackground />
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

      {/* Hero Section with Parallax */}
      <div className="parallax parallax-hero">
        <div className="manga-page">
          <Hero />
        </div>
      </div>

      {/* Content Sections - With ScrollStack */}
      <main className="manga-page">
        {/* Grimoire Orbital - Floating Manga Panels */}
        <GrimoireOrbital
          images={[
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
          ]}
          grimoireImage="/images/grimoire/grimoire-book.jpg"
        />

        {/* ScrollStack Sections */}
        <ScrollStack
          itemDistance={120}
          itemScale={0.04}
          itemStackDistance={35}
          baseScale={0.9}
          useWindowScroll={true}
        >
          <ScrollStackItem>
            <About />
          </ScrollStackItem>

          <ScrollStackItem>
            <Skills />
          </ScrollStackItem>

          <ScrollStackItem>
            <Projects />
          </ScrollStackItem>

          <ScrollStackItem>
            <Journey />
          </ScrollStackItem>
        </ScrollStack>

        {/* Parallax Divider */}
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

        <Footer />
      </main>
    </div>
  );
}

export default App;
