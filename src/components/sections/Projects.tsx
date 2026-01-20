import { ExternalLink } from 'lucide-react';
import Shuffle from '../ui/Shuffle';
import GlitchText from '../ui/GlitchText';
import ScrollStack, { ScrollStackItem } from '../ui/ScrollStack';

const projects = [
  {
    title: 'AI-Powered Mentoring Platform',
    role: 'Web Development',
    desc: 'AI-based mentoring platform with personalized learning paths, study materials, and real-time dashboard.',
    tags: ['AI', 'React', 'Node.js'],
  },
  {
    title: 'Lost & Found Web Application',
    role: 'MERN Stack',
    desc: 'Platform for reporting, searching, and claiming lost items with secure authentication.',
    tags: ['MERN', 'Auth', 'Geo'],
  },
  {
    title: 'Flight Delay & Prediction',
    role: 'Predictive Analytics',
    desc: 'ML model using XGBoost to predict flight delays with high accuracy.',
    tags: ['Python', 'ML', 'XGBoost'],
  },
  {
    title: 'Rescue Connect',
    role: 'Agile Project',
    desc: 'Platform for efficient coordination during emergency situations.',
    tags: ['Agile', 'GitHub', 'Team'],
  },
];

export default function Projects() {
  return (
    <section id="projects" className="manga-section">
      {/* Section Header */}
      <div className="manga-panel p-6 mb-4">
        <div className="flex items-center gap-8">
          <div className="exclaim-box">03</div>
          <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">
            <GlitchText speed={0.8} enableOnHover={false}>WORKS</GlitchText>
          </h2>
        </div>
      </div>

      {/* ScrollStack Projects */}
      <ScrollStack
        itemDistance={150}
        itemScale={0.05}
        itemStackDistance={40}
        baseScale={0.9}
        useWindowScroll={true}
      >
        {projects.map((proj, i) => (
          <ScrollStackItem key={i}>
            {/* Header */}
            <div className="bg-[#1a1a1a] px-4 py-2">
              <span className="text-[#fbbf24] text-xs font-bold uppercase">
                <Shuffle text={proj.role} duration={0.3} />
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-black text-lg uppercase mb-3">
                <Shuffle text={proj.title} duration={0.4} />
              </h3>

              {/* Description - Thought Bubble */}
              <div className="thought-bubble mb-4 text-sm">
                <Shuffle text={proj.desc} duration={0.5} stagger={0.01} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.tags.map((t) => (
                  <span key={t} className="text-xs font-bold border border-[#1a1a1a] px-2 py-0.5 uppercase bg-white text-black">
                    <Shuffle text={t} duration={0.2} />
                  </span>
                ))}
              </div>

              <button className="manga-button w-full py-2 text-sm flex items-center justify-center gap-2">
                <ExternalLink className="w-4 h-4" />
                <span>View Quest</span>
              </button>
            </div>
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  );
}
