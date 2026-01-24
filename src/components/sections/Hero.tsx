import { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import Shuffle from '../ui/Shuffle';
import ResumeModal from '../modals/ResumeModal';

export default function Hero() {
  const comp = useRef(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showTamil, setShowTamil] = useState(true);
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
        }, '-=0.4');
    }, comp);

    return () => ctx.revert();
  }, []);

  return (
    <section id="home" className="manga-section" ref={comp}>
      {/* Main Hero Panel */}
      <div className="manga-panel manga-panel-hero manga-panel-dark p-5 sm:p-8 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.3 }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-3 lg:gap-4">
          {/* Profile Panel */}
          <div className="manga-panel p-1 bg-white flex-shrink-0 profile-image">
            <img
              src="/images/profile.jpg"
              alt="Shuvik M"
              className="w-36 h-36 sm:w-48 sm:h-48 object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Title Tag with enhanced animation */}
            <div className="overflow-visible mb-1">
              <div className="exclaim-box hero-text-element animate-popup" style={{ letterSpacing: '0.2em', overflow: 'visible', fontSize: 'clamp(0.8rem, 1.8vw, 1rem)' }}>
                SOFTWARE DEVELOPER
              </div>
            </div>
            {/* Name with proper spacing to prevent cutoff */}
            <div className="overflow-visible mb-2">
              <Shuffle
                text="SHUVIK M"
                tag="h1"
                className="hero-text-element font-heading font-black tracking-[0.12em] overflow-visible"
                style={{
                  fontSize: 'clamp(2rem, 4vw, 2.6rem)',
                  lineHeight: '1.2',
                  letterSpacing: '0.12em',
                  fontWeight: '900',
                  textShadow: '3px 3px 0 #1a1a1a, 5px 5px 0 rgba(251, 191, 36, 0.3)',
                  WebkitTextStroke: '1px #1a1a1a',
                  paintOrder: 'stroke fill'
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

            {/* Thirukkural Quote with Translation Toggle */}
            <div className="mb-2 text-center lg:text-left overflow-visible">
              {/* Translation Toggle Switch */}
              <div className="mb-2 flex justify-center lg:justify-start items-center gap-2">
                <span className="text-white/70 text-xs font-tamil">தமிழ்</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={!showTamil}
                    onChange={() => setShowTamil(!showTamil)}
                  />
                  <div className="switch-background"></div>
                </label>
                <span className="text-white/70 text-xs font-heading">English</span>
              </div>

              <div className="space-y-3">
                {showTamil ? (
                  <>
                    {/* Tamil Script Only */}
                    <Shuffle
                      text="தெய்வத்தின் அருளாலே கைகூடாது போனாலும், ஒருவனுடைய முயற்சியானது, தன் உடல் வருத்தத்தின் கூலியைத் தப்பாமல் தந்துவிடும் (௬௱௰௯)"
                      tag="p"
                      className="text-[#fbbf24] font-tamil font-black text-[20px] leading-relaxed max-w-2xl mx-auto lg:mx-0 break-words"
                      duration={0.5}
                      stagger={0.01}
                      triggerOnHover={false}
                    />
                  </>
                ) : (
                  <>
                    {/* English Mode: Phonetics (Large) + English Meaning */}
                    <div className="overflow-visible space-y-2 mb-3">
                      <Shuffle
                        text="THEYVATHTHAAN AAKAA THENINUM MUYARSIDHAN"
                        tag="p"
                        className="text-[#fbbf24] font-heading font-black text-[16px] tracking-wide break-words leading-tight"
                        duration={0.4}
                        stagger={0.02}
                        triggerOnHover={true}
                        triggerOnce={false}
                      />
                      <Shuffle
                        text="MEYVARUTHTHAK KOOLI THARUM"
                        tag="p"
                        className="text-[#fbbf24] font-heading font-black text-[16px] tracking-wide break-words leading-tight"
                        duration={0.4}
                        stagger={0.02}
                        triggerOnHover={true}
                        triggerOnce={false}
                      />
                    </div>

                    {/* English Meaning */}
                    <div>
                      <p className="text-white/40 text-xs font-heading mb-2 lowercase tracking-widest">meaning</p>
                      <Shuffle
                        text="Even though God be against, Effort is bound to pay the wages of labour."
                        tag="p"
                        className="text-[#fbbf24] font-heading font-black text-[13px] leading-relaxed max-w-2xl mx-auto lg:mx-0 break-words"
                        duration={0.5}
                        stagger={0.01}
                        triggerOnHover={false}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Moving Text Strip */}
      <div className="moving-text-container mt-2">
        <div className="moving-text-strip">
          {[...marqueeTexts, ...marqueeTexts].map((text, i) => (
            <span key={i}>{text}</span>
          ))}
        </div>
      </div>

      {/* Resume Download */}
      <div className="mt-2 manga-panel p-3 flex items-center justify-between flex-wrap gap-3 hero-btn">
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
