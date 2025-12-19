import { Swords, Shield, Zap, Gauge } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'React', level: 85, category: 'Frontend', icon: '⚛️' },
  { name: 'JavaScript', level: 80, category: 'Programming', icon: '📜' },
  { name: 'Node.js', level: 75, category: 'Backend', icon: '🟢' },
  { name: 'Express', level: 75, category: 'Backend', icon: '🚂' },
  { name: 'MongoDB', level: 70, category: 'Database', icon: '🍃' },
  { name: 'Python', level: 75, category: 'Programming', icon: '🐍' },
  { name: 'HTML/CSS', level: 90, category: 'Frontend', icon: '🎨' },
  { name: 'C', level: 70, category: 'Programming', icon: '⚙️' },
  { name: 'Java', level: 75, category: 'Programming', icon: '☕' },
  { name: 'Git/GitHub', level: 80, category: 'Tools', icon: '📦' },
  { name: 'Machine Learning', level: 65, category: 'AI/ML', icon: '🤖' },
  { name: 'UI/UX Design', level: 70, category: 'Design', icon: '✨' },
];

export default function Skills() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedLevels, setAnimatedLevels] = useState<number[]>(skills.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => {
            skills.forEach((skill, index) => {
              setTimeout(() => {
                setAnimatedLevels((prev) => {
                  const newLevels = [...prev];
                  newLevels[index] = skill.level;
                  return newLevels;
                });
              }, index * 100);
            });
          }, 300);
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
    <section id="skills" ref={sectionRef} className="relative py-32 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-purple-400/30 px-6 py-3 rounded-full">
              <Swords className="w-6 h-6 text-purple-400" />
              <span className="text-purple-400 font-bold text-lg">CHARACTER STATS</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            POWER <span className="text-purple-400">LEVELS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-purple-400 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Abilities honed through countless battles with bugs and features
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`group relative bg-slate-800/50 backdrop-blur-sm border-2 border-white/10 rounded-xl p-6 overflow-hidden transform hover:scale-105 hover:border-purple-400/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full"></div>

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{skill.icon}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{skill.name}</h3>
                      <p className="text-xs text-gray-400">{skill.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-black text-purple-400">{animatedLevels[index]}</div>
                    <div className="text-xs text-gray-400">LVL</div>
                  </div>
                </div>

                <div className="relative h-3 bg-slate-700/50 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${animatedLevels[index]}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-500">
                  <span>Beginner</span>
                  <span>Intermediate</span>
                  <span>Advanced</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-cyan-400/30 rounded-2xl p-8 text-center">
              <div className="inline-block p-4 bg-cyan-500/20 rounded-full mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-4xl font-black text-white mb-2">ATK</div>
              <div className="text-cyan-400 text-2xl font-bold mb-2">850+</div>
              <p className="text-gray-400 text-sm">Problem Solving Power</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-purple-400/30 rounded-2xl p-8 text-center">
              <div className="inline-block p-4 bg-purple-500/20 rounded-full mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-4xl font-black text-white mb-2">DEF</div>
              <div className="text-purple-400 text-2xl font-bold mb-2">720+</div>
              <p className="text-gray-400 text-sm">Debug Resistance</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-cyan-500 blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-pink-400/30 rounded-2xl p-8 text-center">
              <div className="inline-block p-4 bg-pink-500/20 rounded-full mb-4">
                <Gauge className="w-8 h-8 text-pink-400" />
              </div>
              <div className="text-4xl font-black text-white mb-2">SPD</div>
              <div className="text-pink-400 text-2xl font-bold mb-2">900+</div>
              <p className="text-gray-400 text-sm">Learning Velocity</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
