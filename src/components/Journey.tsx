import { Map, Trophy, Target, Rocket } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface JourneyArc {
  title: string;
  period: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
}

const journeyArcs: JourneyArc[] = [
  {
    title: 'The Beginning',
    period: 'School Years',
    description: 'Started the journey at Bharathi Vidhya Bhavan, Thindal, Erode. Discovered the passion for technology and problem-solving.',
    icon: <Map className="w-6 h-6" />,
    color: 'cyan',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    title: 'The Training Arc',
    period: '2023 - Present',
    description: 'Pursuing B.E. Computer Science at Kongu Engineering College. Building strong foundations in programming, algorithms, and web development.',
    icon: <Target className="w-6 h-6" />,
    color: 'purple',
    gradient: 'from-purple-500 to-pink-600',
  },
  {
    title: 'The Growth Phase',
    period: 'Current Chapter',
    description: 'Actively creating real-world projects, mastering full-stack development, and exploring AI/ML technologies. Continuously improving problem-solving skills.',
    icon: <Trophy className="w-6 h-6" />,
    color: 'pink',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    title: 'The Future Saga',
    period: 'Coming Soon',
    description: 'Aspiring to become a proficient Full Stack Developer, contributing to meaningful projects, and creating digital experiences that make a difference.',
    icon: <Rocket className="w-6 h-6" />,
    color: 'yellow',
    gradient: 'from-yellow-500 to-orange-600',
  },
];

export default function Journey() {
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
    <section id="journey" ref={sectionRef} className="relative py-32 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-yellow-400/30 px-6 py-3 rounded-full">
              <Map className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">STORY ARCS</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            THE <span className="text-yellow-400">JOURNEY</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-pink-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Every hero has a story, and this is mine - chapter by chapter
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 via-purple-500 via-pink-500 to-yellow-500 hidden md:block"></div>

          <div className="space-y-16">
            {journeyArcs.map((arc, index) => (
              <div
                key={arc.title}
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="flex-1 md:text-right" style={{ textAlign: index % 2 === 1 ? 'left' : 'right' }}>
                    <div className={`inline-block ${index % 2 === 1 ? 'md:float-left' : 'md:float-right'}`}>
                      <div className="group relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${arc.gradient} blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}></div>
                        <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-8 max-w-md transform group-hover:scale-105 transition-transform duration-500">
                          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>

                          <div className="relative z-10">
                            <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${arc.gradient} px-4 py-2 rounded-full mb-4`}>
                              <span className="text-white font-bold text-sm">{arc.period}</span>
                            </div>

                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">
                              {arc.title}
                            </h3>

                            <p className="text-gray-300 leading-relaxed">
                              {arc.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex-shrink-0 z-20">
                    <div className={`relative w-20 h-20 bg-gradient-to-br ${arc.gradient} rounded-full flex items-center justify-center border-4 border-slate-900 shadow-2xl transform hover:scale-110 hover:rotate-12 transition-all duration-500`}>
                      {arc.icon}
                      <div className={`absolute inset-0 bg-gradient-to-r ${arc.gradient} rounded-full blur-xl opacity-50`}></div>
                    </div>

                    <div className={`absolute top-1/2 ${index % 2 === 0 ? 'left-full ml-8' : 'right-full mr-8'} -translate-y-1/2 hidden md:block`}>
                      <div className={`w-16 h-0.5 bg-gradient-to-r ${index % 2 === 0 ? arc.gradient : `${arc.gradient} from-${arc.color}-500 to-transparent`}`}></div>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`mt-20 text-center transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="inline-block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-pink-500 blur-2xl opacity-30"></div>
            <div className="relative bg-slate-800/70 backdrop-blur-sm border-2 border-yellow-400/30 rounded-2xl px-12 py-8">
              <p className="text-xl text-gray-200 italic mb-4">
                "The journey of a thousand lines of code begins with a single keystroke."
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                <Rocket className="w-6 h-6 text-yellow-400" />
                <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
