import { GraduationCap, School, Target } from 'lucide-react';
import Shuffle from '../ui/Shuffle';
import GlitchText from '../ui/GlitchText';

export default function About() {
  return (
    <section id="about" className="manga-section py-12">
      {/* Section Header */}
      <div className="manga-panel p-8 mb-8">
        <div className="flex items-center gap-8">
          <div className="exclaim-box" style={{ background: '#fbbf24', color: '#1a1a1a' }}>01</div>
          <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">
            <GlitchText speed={0.8} enableOnHover={false}>WHOAMI</GlitchText>
          </h2>
        </div>
      </div>

      {/* Career Objective */}
      <div className="manga-panel manga-panel-dark p-6 sm:p-8 mb-8 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.2 }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-[#fbbf24]" />
            <Shuffle
              text="Mission"
              tag="h3"
              className="manga-subtitle text-lg"
              shuffleDirection="right"
              duration={0.4}
              stagger={0.03}
            />
          </div>
          <div className="thought-bubble">
            <Shuffle
              text="Seeking an entry-level position in a dynamic organization where I can apply my skills, enhance my knowledge, and contribute to the company's success while growing professionally."
              tag="p"
              className="text-base leading-relaxed text-[#1a1a1a]"
              duration={0.8}
              stagger={0.01}
              triggerOnHover={false}
            />
          </div>
        </div>
      </div>

      {/* Education Grid */}
      <div className="panel-grid panel-grid-2 mb-4">
        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#fbbf24]">
              <GraduationCap className="w-6 h-6 text-[#1a1a1a]" />
            </div>
            <Shuffle
              text="B.TECH CSE"
              tag="h3"
              className="font-black"
              shuffleDirection="left"
              duration={0.4}
              stagger={0.03}
            />
          </div>
          <div className="thought-bubble">
            <p className="font-bold">Kongu Engineering College</p>
            <p className="text-sm text-[#4a4a4a]">Computer Science & Engineering</p>
            <p className="text-sm font-bold text-[#fbbf24] mt-2">CGPA: 7.77*</p>
          </div>
        </div>

        <div className="manga-panel p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#dc2626]">
              <School className="w-6 h-6 text-white" />
            </div>
            <Shuffle
              text="GRADE 12"
              tag="h3"
              className="font-black"
              shuffleDirection="left"
              duration={0.4}
              stagger={0.03}
            />
          </div>
          <div className="thought-bubble">
            <p className="font-bold">Bharathi Vidya Bhavan</p>
            <p className="text-sm text-[#4a4a4a]">Higher Secondary</p>
            <p className="text-sm font-bold text-[#fbbf24] mt-2">Percentage: 82%</p>
          </div>
        </div>
      </div>

      <div className="manga-panel p-6 mb-4">
        <Shuffle
          text="Soft Skills"
          tag="h3"
          className="manga-subtitle text-lg mb-4"
          shuffleDirection="right"
          duration={0.4}
        />
        <div className="flex flex-wrap gap-3">
          {['Leadership', 'Teamwork', 'Adaptability', 'Communication'].map((skill, i) => (
            <div key={i} className="thought-bubble py-2 px-4 text-sm font-bold">
              <Shuffle text={skill} duration={0.3} stagger={0.02} />
            </div>
          ))}
        </div>
      </div>

      <div className="manga-panel manga-panel-dark p-6">
        <Shuffle
          text="Areas of Interest"
          tag="h3"
          className="manga-subtitle text-lg mb-4"
          shuffleDirection="right"
          duration={0.4}
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Web Development', 'UI/UX Design', 'Operating Systems', 'Computer Networks', 'DBMS', 'CapCut Editing'].map((interest, i) => (
            <div key={i} className="thought-bubble py-2 px-4 text-sm font-medium text-center">
              <Shuffle text={interest} duration={0.3} stagger={0.02} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
