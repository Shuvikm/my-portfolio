import { Code, Database, Wrench, Palette } from 'lucide-react';
import GlitchText from '../ui/GlitchText';

const skills = {
  languages: ['Java', 'C', 'Python'],
  frontend: ['HTML', 'CSS', 'React', 'JavaScript'],
  databases: ['MongoDB'],
  tools: ['Git', 'GitHub', 'VS Code'],
};

export default function Skills() {
  return (
    <section id="skills" className="manga-section">
      {/* Section Header */}
      <div className="manga-panel p-6 mb-4 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-8">
          <div className="exclaim-box" style={{ background: '#fbbf24', color: '#1a1a1a' }}>02</div>
          <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">
            <GlitchText speed={0.8} enableOnHover={false}>STACK</GlitchText>
          </h2>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="panel-grid panel-grid-2 mb-4">
        {/* Languages */}
        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#dc2626]">
              <Code className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-black uppercase text-sm">Languages</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.languages.map((skill) => (
              <div key={skill} className="thought-bubble py-2 px-4 text-sm font-bold">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Frontend */}
        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#fbbf24]">
              <Palette className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <h3 className="font-black uppercase text-sm">Frontend</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.frontend.map((skill) => (
              <div key={skill} className="thought-bubble py-2 px-4 text-sm font-bold">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Databases */}
        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#22c55e]">
              <Database className="w-5 h-5 text-white" />
            </div>
            <h3 className="font-black uppercase text-sm">Databases</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.databases.map((skill) => (
              <div key={skill} className="thought-bubble py-2 px-4 text-sm font-bold">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#22d3ee]">
              <Wrench className="w-5 h-5 text-[#1a1a1a]" />
            </div>
            <h3 className="font-black uppercase text-sm">Tools</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.tools.map((skill) => (
              <div key={skill} className="thought-bubble py-2 px-4 text-sm font-bold">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tech Summary */}
      <div className="manga-panel p-6">
        <h3 className="manga-subtitle text-sm mb-3 text-center">Full Stack</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {[...skills.languages, ...skills.frontend, ...skills.databases, ...skills.tools].map((tech, i) => (
            <span key={i} className="bg-white border-2 border-[#fbbf24] text-[#1a1a1a] px-3 py-1 text-xs font-bold uppercase hover:bg-[#fbbf24] hover:text-white transition-colors cursor-default">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
