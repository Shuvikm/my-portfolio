import { GraduationCap, School, Target } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="manga-section">
      {/* Section Header */}
      <div className="manga-panel p-6 mb-4">
        <div className="flex items-center gap-4">
          <div className="exclaim-box">01</div>
          <h2 className="manga-title text-3xl sm:text-4xl text-[#1a1a1a]">WHOAMI</h2>
        </div>
      </div>

      {/* Career Objective */}
      <div className="manga-panel manga-panel-dark p-6 sm:p-8 mb-4 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.2 }} />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-[#fbbf24]" />
            <h3 className="manga-subtitle text-lg text-[#fbbf24]">Mission</h3>
          </div>
          <div className="thought-bubble">
            <p className="text-base leading-relaxed text-[#1a1a1a]">
              Seeking an entry-level position in a dynamic organization where I can apply my skills,
              enhance my knowledge, and contribute to the company's success while growing professionally.
            </p>
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
            <h3 className="font-black text-[#1a1a1a]">B.TECH CSE</h3>
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
            <h3 className="font-black text-[#1a1a1a]">GRADE 12</h3>
          </div>
          <div className="thought-bubble">
            <p className="font-bold">Bharathi Vidya Bhavan</p>
            <p className="text-sm text-[#4a4a4a]">Higher Secondary</p>
            <p className="text-sm font-bold text-[#fbbf24] mt-2">Percentage: 82%</p>
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="manga-panel p-6 mb-4">
        <h3 className="manga-subtitle text-lg text-[#1a1a1a] mb-4">Soft Skills</h3>
        <div className="flex flex-wrap gap-3">
          {['Leadership', 'Teamwork', 'Adaptability', 'Communication'].map((skill, i) => (
            <div key={i} className="thought-bubble py-2 px-4 text-sm font-bold">
              {skill}
            </div>
          ))}
        </div>
      </div>

      {/* Areas of Interest */}
      <div className="manga-panel manga-panel-dark p-6">
        <h3 className="manga-subtitle text-lg text-[#fbbf24] mb-4">Areas of Interest</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {['Web Development', 'UI/UX Design', 'Operating Systems', 'Computer Networks', 'DBMS', 'CapCut Editing'].map((interest, i) => (
            <div key={i} className="thought-bubble py-2 px-4 text-sm font-medium text-center">
              {interest}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
