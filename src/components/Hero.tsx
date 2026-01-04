import { Github, Linkedin, Mail, Code2 } from 'lucide-react';

export default function Hero() {
  const marqueeTexts = [
    'ソフトウェア開発者',
    'SOFTWARE DEVELOPER',
    'フルスタック',
    'FULL STACK',
  ];

  return (
    <section id="home" className="manga-section">
      {/* Main Hero Panel */}
      <div className="manga-panel manga-panel-dark p-8 sm:p-12 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.3 }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Profile Panel */}
          <div className="manga-panel p-2 bg-white flex-shrink-0">
            <img
              src="/images/profile.jpg"
              alt="Shuvik M"
              className="w-64 h-64 sm:w-72 sm:h-72 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title Tag */}
            <div className="exclaim-box mb-4">Software Developer</div>

            {/* Name */}
            <h1 className="manga-title text-5xl sm:text-6xl lg:text-7xl text-white text-outline-thick mb-6">
              SHUVIK <span className="text-[#fbbf24]">M</span>
            </h1>

            {/* Description - Thought Bubble */}
            <div className="thought-bubble max-w-xl mx-auto lg:mx-0 mb-8">
              <p className="text-base leading-relaxed">
                Crafting digital experiences through code, inspired by the creativity of anime and
                manga. Building meaningful web applications.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a href="#projects" className="manga-button">View Projects</a>
              <a href="#contact" className="manga-button manga-button-dark">Contact Me</a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {[
                { icon: Github, href: 'https://github.com/Shuvikm' },
                { icon: Linkedin, href: 'https://www.linkedin.com/in/shuvikm/' },
                { icon: Code2, href: 'https://leetcode.com/u/Shuvik_M/' },
                { icon: Mail, href: 'mailto:mshuvik@gmail.com' },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target={social.href.startsWith('http') ? '_blank' : undefined}
                  rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="social-icon"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Moving Text Strip */}
      <div className="moving-text-container mt-4">
        <div className="moving-text-strip">
          {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      <div className="mt-4 manga-panel p-4 flex items-center justify-between flex-wrap gap-4">
        <span className="font-bold text-[#1a1a1a]">Want to know more?</span>
        <div className="flex gap-3">
          <a
            href="/resume.png"
            target="_blank"
            rel="noopener noreferrer"
            className="manga-button text-sm py-2 px-6"
          >
            📄 View Resume
          </a>
          <a
            href="/resume.pdf"
            download="Shuvik_M_Resume.pdf"
            className="manga-button manga-button-dark text-sm py-2 px-6"
          >
            ⬇️ Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
