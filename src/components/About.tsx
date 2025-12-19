import { BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-cyan-400/30 px-6 py-3 rounded-full">
              <BookOpen className="w-6 h-6 text-cyan-400" />
              <span className="text-cyan-400 font-bold text-lg">CHAPTER 01</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            THE ORIGIN <span className="text-cyan-400">STORY</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className={`manga-panel group transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative h-full premium-card border-4 border-white/6 rounded-2xl p-8 overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/20 to-transparent rounded-tr-full"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-cyan-400 pl-4">
                  The Passion
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  A passionate and motivated developer focused on building modern, user-friendly web applications.
                </p>

                <p className="text-gray-400 text-sm italic">
                  "Combining clean, structured code with creative storytelling elements inspired by anime and manga."
                </p>
              </div>

              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-4 border-cyan-400 opacity-20 transform rotate-45"></div>
            </div>
          </div>

            <div className={`manga-panel group transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative h-full premium-card border-4 border-white/6 rounded-2xl p-8 overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-transparent rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-cyan-500/20 to-transparent rounded-tl-full"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-pink-400 pl-4">
                  The Education
                </h3>

                <div className="space-y-4 mb-4">
                  <div>
                    <p className="text-cyan-400 font-bold">Bharathi Vidhya Bhavan</p>
                    <p className="text-gray-400 text-sm">Thindal, Erode</p>
                  </div>

                  <div>
                    <p className="text-pink-400 font-bold">Kongu Engineering College</p>
                    <p className="text-gray-300">B.E. Computer Science</p>
                    <p className="text-gray-400 text-sm">2023 - 2027</p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-2 -left-2 w-16 h-16 border-4 border-pink-400 opacity-20 transform -rotate-45"></div>
            </div>
          </div>

            <div className={`manga-panel group transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative h-full premium-card border-4 border-white/6 rounded-2xl p-8 overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-transparent rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-yellow-500/20 to-transparent rounded-tr-full"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-yellow-600 rounded-2xl flex items-center justify-center mb-6 transform group-hover:rotate-12 transition-transform duration-500">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 border-l-4 border-purple-400 pl-4">
                  The Journey
                </h3>

                <p className="text-gray-300 leading-relaxed mb-4">
                  Currently in the learning phase, focusing on building a strong foundation in computer science and full-stack web development.
                </p>

                <p className="text-gray-400 text-sm italic">
                  "Actively practicing by creating real-world projects and exploring modern technologies."
                </p>
              </div>

              <div className="absolute -bottom-2 -right-2 w-16 h-16 border-4 border-purple-400 opacity-20 transform rotate-45"></div>
            </div>
          </div>
        </div>

        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30"></div>
            <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl px-12 py-8 max-w-3xl">
              <p className="text-xl text-gray-200 italic leading-relaxed">
                "Every great developer starts with a dream. Mine is to create meaningful digital experiences that combine technical excellence with creative storytelling. The adventure has just begun."
              </p>
              <div className="mt-4 text-cyan-400 font-bold text-lg">- Shuvik M</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
