import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-slate-900">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid rgba(34, 211, 238, 0.2)',
          },
          success: {
            iconTheme: {
              primary: '#22d3ee',
              secondary: '#1e293b',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#1e293b',
            },
          },
        }}
      />
      <Navigation />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
