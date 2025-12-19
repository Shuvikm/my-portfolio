import { ChevronDown, Github, Linkedin, Code } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getCurrentUser, User } from '../lib/api';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    setIsVisible(true);
    setCurrentUser(getCurrentUser());
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Profile image (uses logged-in user's profileImage or server image). Falls back to inline SVG if broken. */}
      <img
        src={currentUser?.profileImage || `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/images/attached-profile.jpg`}
        alt="Profile"
        onError={(e) => {
          const el = e.currentTarget as HTMLImageElement;
          el.onerror = null;
          el.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><rect rx="80" ry="80" width="160" height="160" fill="%2322394a"/><text x="50%" y="52%" font-size="36" fill="%23fff" text-anchor="middle" font-family="Arial" dy="12">SM</text></svg>';
        }}
        className="hidden md:block absolute right-12 top-24 w-40 h-40 rounded-full object-cover ring-4 ring-cyan-400/30 shadow-2xl vignette"
      />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptMCAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTE4IDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20"></div>

      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-pulse delay-100"></div>
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-pulse delay-200"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse delay-300"></div>
      </div>

      <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="mb-8 inline-block">
          <div className="relative group premium-card p-6 rounded-3xl inline-block transform hover:scale-103 transition-transform duration-500">
            <div className="relative bg-gradient-to-br from-slate-800/40 to-slate-900/20 rounded-2xl p-8 shadow-lg">
              <Code className="w-24 h-24 text-cyan-300 mx-auto mb-4" strokeWidth={1.5} />
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-400 rounded-full border-4 border-slate-900 animate-bounce"></div>
            </div>
          </div>
        </div>

        <h1 className="text-7xl md:text-8xl font-black mb-6 tracking-tight leading-tight">
          <span className="inline-block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
            SHUVIK M
          </span>
        </h1>

        <div className="relative inline-block mb-8 floaty">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur-3xl rounded-xl"></div>
          <h2 className="relative text-2xl md:text-4xl font-bold text-white/95 px-6 py-3 border-l-4 border-r-4 border-cyan-400 rounded-md backdrop-blur-sm premium-card">
            ASPIRING FULL STACK DEVELOPER
          </h2>
        </div>

        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Crafting digital experiences through code, inspired by the creativity of anime and the power of modern web technologies.
        </p>

        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <span className="relative z-10">Start Your Journey</span>
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>

          <a
            href="#projects"
            className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 text-white font-bold rounded-lg hover:bg-slate-800 hover:border-cyan-400 transform hover:scale-105 transition-all duration-300"
          >
            View Projects
          </a>
        </div>

        <div className="flex gap-6 justify-center">
          <a
            href="https://github.com/Shuvikm"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-slate-800/60 backdrop-blur-sm border-2 border-slate-700 rounded-full hover:border-cyan-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300 soft-ring"
          >
            <Github className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/shuvik-m-368659320"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-full hover:border-cyan-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          >
            <Linkedin className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
          </a>
          <a
            href="https://leetcode.com/u/Shuvik_M/"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-4 bg-slate-800/50 backdrop-blur-sm border-2 border-slate-700 rounded-full hover:border-cyan-400 transform hover:scale-110 hover:-translate-y-1 transition-all duration-300"
          >
            <Code className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce bg-slate-800/40 p-3 rounded-full border border-cyan-400/20 shadow-lg hover:scale-105 transition-all"
      >
        <ChevronDown className="w-8 h-8 text-cyan-400" />
      </a>

      <style>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        .delay-100 { animation-delay: 100ms; }
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
      `}</style>
    </section>
  );
}
