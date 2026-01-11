import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['manga-gallery', 'about', 'skills', 'projects', 'journey', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      if (window.scrollY < 300) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'manga-gallery', label: 'MANGA', num: '00' },
    { id: 'about', label: 'WHOAMI', num: '01' },
    { id: 'skills', label: 'STACK', num: '02' },
    { id: 'projects', label: 'WORKS', num: '03' },
    { id: 'journey', label: 'ACHIEVEMENTS', num: '04' },
    { id: 'contact', label: 'CONTACT', num: '05' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#333]'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <div className="text-xl sm:text-2xl font-black text-white group-hover:text-[#fbbf24] transition-colors tracking-tight">
                SHUVIK<span className="text-[#fbbf24]">.</span>
              </div>
            </button>

            {/* Desktop Nav - Minimal */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative font-bold text-sm tracking-wider transition-all duration-200 group ${activeSection === link.id
                    ? 'text-[#fbbf24]'
                    : 'text-gray-400 hover:text-white'
                    }`}
                >
                  {link.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-[#fbbf24] transition-all duration-200 ${activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                    }`} />
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-[#fbbf24] transition-colors"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Professional Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Background */}
        <div
          className="absolute inset-0 bg-[#0a0a0a]"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 z-50 p-3 text-white hover:text-[#fbbf24] transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
          <nav className="space-y-0">
            {navLinks.map((link, index) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`group w-full text-left py-4 border-b border-[#333] transition-all duration-300 ${isMobileMenuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-10 opacity-0'
                  }`}
                style={{ transitionDelay: `${index * 80}ms` }}
              >
                <div className="flex items-center gap-6">
                  {/* Number */}
                  <span className="text-[#fbbf24] text-lg font-mono font-bold">
                    {link.num}
                  </span>

                  {/* Label */}
                  <span className={`text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight transition-colors duration-200 ${activeSection === link.id
                    ? 'text-[#fbbf24]'
                    : 'text-white group-hover:text-[#fbbf24]'
                    }`}>
                    {link.label}
                  </span>
                </div>
              </button>
            ))}
          </nav>

          {/* Footer info */}
          <div className="absolute bottom-8 left-8 text-gray-500 text-sm font-mono">
            <div>SHUVIK MUTHUKUMAR</div>
            <div className="text-[#fbbf24]">Software Developer</div>
          </div>
        </div>
      </div>
    </>
  );
}
