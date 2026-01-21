import { Github, Linkedin, Mail, Code2 } from 'lucide-react';
import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import Shuffle from '../ui/Shuffle';
import ResumeModal from '../modals/ResumeModal';

export default function Hero() {
  const comp = useRef(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const marqueeTexts = [
    'ソフトウェア開発者',
    'SOFTWARE DEVELOPER',
    'フルスタック',
    'FULL STACK',
  ];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Timeline for entrance sequence
      const tl = gsap.timeline();

      // 1. Panel Expand & Fade In
      tl.from('.manga-panel-hero', {
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      })
        // 2. Profile Image Pop
        .from('.profile-image', {
          scale: 0,
          rotation: -45,
          opacity: 0,
          duration: 0.6,
          ease: 'back.out(1.7)',
        }, '-=0.4')
        // 3. Text Elements Stagger
        .from('.hero-text-element', {
          x: -50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
        }, '-=0.2')
        // 4. Buttons Pop
        .from('.hero-btn', {
          y: 20,
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          stagger: 0.1,
          ease: 'back.out(1.5)',
        }, '-=0.4')
        // 5. Social Icons Fade & Slide
        .from('.social-icon', {
          y: 10,
          opacity: 0,
          duration: 0.4,
          stagger: 0.05,
          ease: 'power1.out',
        }, '-=0.2');

    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="manga-section" ref={comp}>
      {/* Main Hero Panel */}
      <div className="manga-panel manga-panel-hero manga-panel-dark p-8 sm:p-12 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.3 }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Profile Panel */}
          <div className="manga-panel p-2 bg-white flex-shrink-0 profile-image">
            <img
              src="/images/profile.jpg"
              alt="Shuvik M"
              className="w-64 h-64 sm:w-72 sm:h-72 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title Tag with proper overflow handling */}
            <div className="overflow-visible mb-4">
              <div className="exclaim-box hero-text-element" style={{ letterSpacing: '0.2em', overflow: 'visible' }}>
                SOFTWARE DEVELOPER
              </div>
            </div>

            {/* Name with proper spacing to prevent cutoff */}
            <div className="overflow-visible py-6 mb-8">
              <Shuffle
                text="SHUVIK M"
                tag="h1"
                className="hero-text-element font-display tracking-[0.3em] overflow-visible"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                  lineHeight: '1.4',
                  letterSpacing: '0.3em',
                  textShadow: '3px 3px 0 #1a1a1a, 6px 6px 0 rgba(251, 191, 36, 0.3)',
                  paddingBottom: '0.5rem'
                }}
                shuffleDirection="down"
                duration={0.3}
                shuffleTimes={5}
                stagger={0.04}
                triggerOnHover={true}
                triggerOnce={false}
                scrambleCharset="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`★☆♦♣♠♥✦✧"
              />
            </div>

            {/* Description - Thought Bubble */}
            <div className="thought-bubble max-w-xl mx-auto lg:mx-0 mb-8 hero-text-element">
              <p className="text-base leading-relaxed">
                Crafting digital experiences through code, inspired by the creativity of anime and
                manga. Building meaningful web applications.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <a href="#projects" className="manga-button hero-btn">View Projects</a>
              <a href="#contact" className="manga-button manga-button-dark hero-btn">Contact Me</a>
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
      <div className="mt-4 manga-panel p-4 flex items-center justify-between flex-wrap gap-4 hero-btn">
        <span className="font-bold text-[#1a1a1a]">Want to know more?</span>
        <div className="flex gap-3">
          <button
            onClick={() => setIsResumeOpen(true)}
            className="manga-button text-sm py-2 px-6"
          >
            📄 View Resume
          </button>
          <a
            href="/resume.pdf"
            download="Shuvik_M_Resume.pdf"
            className="manga-button manga-button-dark text-sm py-2 px-6"
          >
            ⬇️ Download PDF
          </a>
        </div>
      </div>

      {/* Resume Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </section>
  );
}
