import { Brain, Search, DollarSign, Plane, Leaf, ExternalLink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  gradient: string;
  borderColor: string;
}

const projects: Project[] = [
  {
    title: 'AI Mentor Platform',
    description: 'An AI-powered mentoring system that provides personalized learning paths, study materials, automatic quiz generation from PDFs, and a real-time dashboard to track learning progress.',
    icon: <Brain className="w-8 h-8" />,
    tags: ['AI', 'React', 'Node.js', 'Machine Learning'],
    gradient: 'from-cyan-500 to-blue-600',
    borderColor: 'border-cyan-400',
  },
  {
    title: 'Lost & Found Platform',
    description: 'A comprehensive platform allowing users to report, search, and claim lost or found items with authentication, image uploads, and keyword/location-based search functionality.',
    icon: <Search className="w-8 h-8" />,
    tags: ['React', 'MongoDB', 'Express', 'Node.js'],
    gradient: 'from-purple-500 to-pink-600',
    borderColor: 'border-purple-400',
  },
  {
    title: 'Expense Tracker',
    description: 'A full-stack expense tracking system with secure authentication, expense categorization, and data visualization using charts and filters for better financial management.',
    icon: <DollarSign className="w-8 h-8" />,
    tags: ['Full Stack', 'React', 'MongoDB', 'Charts'],
    gradient: 'from-green-500 to-emerald-600',
    borderColor: 'border-green-400',
  },
  {
    title: 'Flight Delay Prediction',
    description: 'A machine learning project predicting flight delays using historical flight, airport, and weather data with optimized ML models for accurate predictions.',
    icon: <Plane className="w-8 h-8" />,
    tags: ['Python', 'ML', 'Pandas', 'XGBoost'],
    gradient: 'from-orange-500 to-red-600',
    borderColor: 'border-orange-400',
  },
  {
    title: 'Carbon Materialization System',
    description: 'A sustainability-focused project designed to capture vehicular emissions and convert collected carbon into usable ink, promoting environmental conservation.',
    icon: <Leaf className="w-8 h-8" />,
    tags: ['IoT', 'Sustainability', 'Innovation'],
    gradient: 'from-teal-500 to-green-600',
    borderColor: 'border-teal-400',
  },
];

export default function Projects() {
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
    <section id="projects" ref={sectionRef} className="relative py-32 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"></div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-4">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border-2 border-pink-400/30 px-6 py-3 rounded-full">
              <ExternalLink className="w-6 h-6 text-pink-400" />
              <span className="text-pink-400 font-bold text-lg">QUEST LOG</span>
            </div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
            LEGENDARY <span className="text-pink-400">MISSIONS</span>
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-pink-400 to-cyan-600 mx-auto mb-6"></div>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Epic adventures through code, each project a chapter in the journey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.slice(0, 4).map((project, index) => (
            <div
              key={project.title}
              className={`manga-panel group relative transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className={`relative h-full bg-slate-800/50 backdrop-blur-sm border-4 ${project.borderColor} border-opacity-30 rounded-2xl overflow-hidden transform group-hover:scale-105 group-hover:border-opacity-100 transition-all duration-500`}>
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-full"></div>

                <div className="relative z-10 p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${project.gradient} rounded-2xl mb-6 transform group-hover:rotate-12 transition-transform duration-500`}>
                    {project.icon}
                  </div>

                  <h3 className="text-2xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-pink-400 transition-all duration-300">
                    {project.title}
                  </h3>

                  <p className="text-gray-300 leading-relaxed mb-6 min-h-[120px]">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-slate-700/50 border border-white/10 text-gray-300 text-sm rounded-full group-hover:border-cyan-400/50 group-hover:text-cyan-400 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full flex items-center justify-center">
                      <ExternalLink className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  COMPLETED
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className={`manga-panel group relative transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className={`relative bg-slate-800/50 backdrop-blur-sm border-4 ${projects[4].borderColor} border-opacity-30 rounded-2xl overflow-hidden transform group-hover:scale-105 group-hover:border-opacity-100 transition-all duration-500`}>
            <div className={`absolute inset-0 bg-gradient-to-r ${projects[4].gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

            <div className="absolute top-0 left-0 w-full h-full opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-white rounded-full"></div>
            </div>

            <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
              <div className={`flex-shrink-0 w-24 h-24 bg-gradient-to-br ${projects[4].gradient} rounded-3xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500`}>
                {projects[4].icon}
              </div>

              <div className="flex-1">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-teal-400 group-hover:to-green-400 transition-all duration-300">
                  {projects[4].title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  {projects[4].description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {projects[4].tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-slate-700/50 border border-white/10 text-gray-300 rounded-full group-hover:border-teal-400/50 group-hover:text-teal-400 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-400 to-green-600 rounded-full flex items-center justify-center">
                  <ExternalLink className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>

            <div className="absolute -top-3 -right-3 bg-yellow-400 text-slate-900 font-black text-sm px-4 py-2 rounded-full transform rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              SPECIAL MISSION
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
