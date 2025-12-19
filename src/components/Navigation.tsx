import { useState, useEffect } from 'react';
import { Menu, X, Code2, LogIn, LogOut } from 'lucide-react';
import AuthModal from './AuthModal';
import { getCurrentUser, logout } from '../lib/api';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState(getCurrentUser());
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    // Check for logged in user on mount
    setUser(getCurrentUser());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = ['about', 'skills', 'projects', 'journey', 'contact'];
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

      if (window.scrollY < 300) {
        setActiveSection('');
      }
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
    { id: 'about', label: 'Story' },
    { id: 'skills', label: 'Stats' },
    { id: 'projects', label: 'Quests' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Connect' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-lg border-b border-cyan-400/20 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                  <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 soft-ring">
                    <Code2 className="w-6 h-6 text-white" strokeWidth={2.5} />
                  </div>
                </div>
              <span className="text-xl font-black text-white hidden sm:block group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-400 transition-all">
                SHUVIK M
              </span>
            </button>

            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-5 py-2 font-bold transition-all duration-300 rounded-lg group ${
                    activeSection === link.id
                      ? 'text-cyan-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeSection === link.id && (
                    <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/30 rounded-lg"></div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                </button>
              ))}
              
              {/* Auth Button */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-slate-800/40 to-slate-900/30 border border-cyan-400/20 rounded-full text-white font-medium hover:scale-105 transition-transform duration-200"
                  >
                    <img src={user.profileImage || '/images/attached-profile.jpg'} alt="avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400/30" />
                    <span className="max-w-24 truncate">{user.name}</span>
                  </button>
                  
                  {showUserMenu && (
                    <div className="absolute top-full right-0 mt-2 w-56 bg-slate-800/80 border border-cyan-400/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur">
                      <div className="px-4 py-3 border-b border-white/10 flex gap-3 items-center">
                        <img src={user.profileImage || '/images/attached-profile.jpg'} alt="avatar" className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-400/30" />
                        <div>
                          <p className="text-white font-medium truncate">{user.name}</p>
                          <p className="text-gray-400 text-sm truncate">{user.email}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setUser(null);
                          setShowUserMenu(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-3 text-gray-300 hover:text-white hover:bg-red-500/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center gap-2 px-5 py-2 btn-premium rounded-full text-white font-bold hover:scale-105 transform transition-all duration-200"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </button>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/95 backdrop-blur-lg"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full px-12 py-4 text-2xl font-black transition-all duration-300 ${
                    activeSection === link.id
                      ? 'text-cyan-400 scale-110'
                      : 'text-gray-300 hover:text-white hover:scale-105'
                  }`}
                  style={{
                    transitionDelay: `${index * 50}ms`,
                    opacity: isMobileMenuOpen ? 1 : 0,
                    transform: isMobileMenuOpen
                      ? 'translateY(0)'
                      : 'translateY(-20px)',
                  }}
                >
                  {link.label}
                </button>
              ))}
              
              {/* Mobile Auth Button */}
              {user ? (
                <button
                  onClick={() => {
                    logout();
                    setUser(null);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-12 py-4 text-2xl font-black text-red-400 hover:text-red-300 transition-all duration-300"
                >
                  Sign Out
                </button>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full px-12 py-4 text-2xl font-black text-cyan-400 hover:text-cyan-300 transition-all duration-300"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={(newUser) => setUser(newUser)}
      />
    </>
  );
}
