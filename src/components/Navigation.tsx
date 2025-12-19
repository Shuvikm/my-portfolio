import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { getCurrentUser, API_BASE_URL } from '../lib/api';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [user] = useState(getCurrentUser());
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [uploadTs, setUploadTs] = useState<number>(() => Number(localStorage.getItem('profileImageTs') || '0'));

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

      if (window.scrollY < 300) setActiveSection('');
    };

    window.addEventListener('scroll', handleScroll);
    const onStorage = () => setUploadTs(Number(localStorage.getItem('profileImageTs') || '0'));
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', onStorage);
    };
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
          isScrolled ? 'bg-slate-900/95 backdrop-blur-lg border-b border-cyan-400/20 shadow-lg' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-lg opacity-50 group-hover:opacity-75 transition-opacity rounded-xl"></div>
                <img
                  src={`${user.profileImage || '/images/attached-profile.jpg'}?t=${uploadTs}`}
                  alt="owner"
                  className="relative w-12 h-12 rounded-xl object-cover transform group-hover:rotate-6 transition-transform duration-300 soft-ring"
                />
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
                    activeSection === link.id ? 'text-cyan-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  {activeSection === link.id && <div className="absolute inset-0 bg-cyan-500/10 border border-cyan-400/30 rounded-lg"></div>}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 rounded-lg transition-all duration-300"></div>
                </button>
              ))}

              <div className="relative">
                <button onClick={() => setShowUserMenu(!showUserMenu)} className="flex items-center gap-3 px-3 py-2 bg-gradient-to-r from-slate-800/40 to-slate-900/30 border border-cyan-400/20 rounded-full text-white font-medium hover:scale-105 transition-transform duration-200">
                  <img src={`${user.profileImage || '/images/attached-profile.jpg'}?t=${uploadTs}`} alt="avatar" className="w-8 h-8 rounded-full object-cover ring-2 ring-cyan-400/30" />
                  <span className="max-w-24 truncate">{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-2 w-72 bg-slate-800/80 border border-cyan-400/20 rounded-lg shadow-2xl overflow-hidden backdrop-blur">
                    <div className="px-4 py-3 border-b border-white/10 flex gap-3 items-center">
                      <img src={`${user.profileImage || '/images/attached-profile.jpg'}?t=${uploadTs}`} alt="avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400/30" />
                      <div>
                        <p className="text-white font-medium truncate">{user.name}</p>
                        <p className="text-gray-400 text-sm truncate">{user.email}</p>
                      </div>
                    </div>
                    <div className="px-4 py-3">
                      <p className="text-sm text-gray-300 mb-2">Upload a new profile photo</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const reader = new FileReader();
                          reader.onload = async () => {
                            const dataUrl = reader.result as string;
                            try {
                              const res = await fetch(`${API_BASE_URL}/auth/owner-upload`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ imageBase64: dataUrl, filename: 'attached-profile.jpg' })
                              });
                              const json = await res.json();
                              if (res.ok) {
                                const ts = Date.now();
                                localStorage.setItem('profileImageTs', String(ts));
                                setUploadTs(ts);
                                toast.success('Profile photo uploaded successfully!');
                              } else {
                                console.error('Upload failed', json);
                                toast.error('Upload failed. Please try again.');
                              }
                            } catch (err) {
                              console.error(err);
                              toast.error('Upload error. Please try again.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }}
                        className="w-full text-sm text-gray-300"
                      />
                    </div>
                    <div className="px-4 py-3 text-sm text-gray-300">Owner-only profile. No login required.</div>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-lg" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div className="relative h-full flex items-center justify-center">
            <div className="space-y-4">
              {navLinks.map((link, index) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`block w-full px-12 py-4 text-2xl font-black transition-all duration-300 ${
                    activeSection === link.id ? 'text-cyan-400 scale-110' : 'text-gray-300 hover:text-white hover:scale-105'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </button>
              ))}

              <div className="px-6">
                <div className="flex items-center gap-3 mb-4">
                  <img src={`${user.profileImage || '/images/attached-profile.jpg'}?t=${uploadTs}`} alt="avatar" className="w-12 h-12 rounded-full object-cover ring-2 ring-cyan-400/30" />
                  <div>
                    <p className="text-white font-medium">{user.name}</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-300">Owner-only profile. No login required.</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
