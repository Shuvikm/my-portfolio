import { useState } from 'react';
import { Trophy, ZoomIn, Medal, X, Maximize2 } from 'lucide-react';
import CertificateModal from './CertificateModal';

const achievements = [
  {
    year: '2024 - 2025',
    title: 'Smart India Hackathon',
    desc: 'Participated in SIH 2024 and 2025 as Team Lead',
    icon: Trophy,
    highlight: true,
    image: null,
  },
  {
    year: '2025',
    title: 'Interzone Handball',
    desc: '4th place in Interzone Handball competition',
    icon: Medal,
    highlight: false,
    image: null,
  },
  {
    year: '2025',
    title: 'Handball Centies',
    desc: '2nd place - Runner Up!',
    icon: Medal,
    highlight: true,
    image: '/images/achievements/handball-trophy.jpg',
    teamImage: '/images/achievements/handball-team.jpg',
  },
];

const certifications = [
  {
    name: 'MongoDB Associate Certified',
    issuer: 'MongoDB, Inc.',
    date: '2025',
    image: '/images/certifications/mongodb-cert.png',
  },
  {
    name: 'Oracle APEX Cloud Developer',
    issuer: 'Oracle Corporation',
    code: '1Z0-771',
    date: '2025',
    image: '/images/certifications/oracle-cert.png',
  },
];

export default function Journey() {
  const [showModal, setShowModal] = useState(false);
  const [selectedCert, setSelectedCert] = useState({ image: '', title: '' });
  const [showAchievementModal, setShowAchievementModal] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState<{
    title: string;
    image: string | null;
    teamImage?: string;
  } | null>(null);
  const [fullImageView, setFullImageView] = useState<string | null>(null);

  return (
    <section id="journey" className="manga-section">
      {/* Section Header */}
      <div className="manga-panel manga-panel-dark p-6 mb-4 relative overflow-hidden">
        <div className="screentone" style={{ opacity: 0.2 }} />
        <div className="relative z-10 flex items-center gap-4">
          <div className="exclaim-box">04</div>
          <h2 className="manga-title text-3xl sm:text-4xl text-white">ACHIEVEMENTS</h2>
        </div>
      </div>

      {/* Achievements */}
      <div className="manga-panel p-6 mb-4">
        <h3 className="manga-subtitle text-lg text-[#1a1a1a] mb-4">Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement, i) => (
            <div
              key={i}
              onClick={() => {
                if (achievement.image) {
                  setSelectedAchievement({
                    title: achievement.title,
                    image: achievement.image,
                    teamImage: achievement.teamImage,
                  });
                  setShowAchievementModal(true);
                }
              }}
              className={`p-4 border-l-4 transition-all ${achievement.highlight ? 'border-[#fbbf24] bg-[#fbbf24]/5' : 'border-[#4a4a4a] bg-gray-50'
                } ${achievement.image ? 'cursor-pointer hover:translate-x-2' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`p-2 ${achievement.highlight ? 'bg-[#fbbf24]' : 'bg-[#4a4a4a]'}`}>
                  <achievement.icon className={`w-5 h-5 ${achievement.highlight ? 'text-[#1a1a1a]' : 'text-white'}`} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-black uppercase text-[#1a1a1a]">{achievement.title}</h4>
                    <span className="text-xs font-bold bg-[#1a1a1a] text-[#fbbf24] px-2 py-0.5">{achievement.year}</span>
                  </div>
                  <div className="thought-bubble text-sm">
                    {achievement.desc}
                    {achievement.image && (
                      <span className="block mt-1 text-[#fbbf24] text-xs font-bold">📷 Click to view!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Certifications */}
      <div className="panel-grid panel-grid-2 mb-4">
        {certifications.map((cert, i) => (
          <div
            key={i}
            onClick={() => {
              setSelectedCert({ image: cert.image, title: cert.name });
              setShowModal(true);
            }}
            className="manga-panel p-5 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="mb-3">
              <span className="text-xs font-bold bg-[#fbbf24] text-[#1a1a1a] px-2 py-1">CERTIFIED</span>
            </div>
            <div className="thought-bubble mb-4">
              <h4 className="font-black uppercase text-sm leading-tight mb-1">{cert.name}</h4>
              <p className="text-xs text-[#4a4a4a]">{cert.issuer}</p>
              {cert.code && <p className="text-xs text-[#4a4a4a]">Code: {cert.code}</p>}
            </div>
            <button className="manga-button w-full py-2 text-xs flex items-center justify-center gap-2">
              <ZoomIn className="w-4 h-4" />
              <span>View Certificate</span>
            </button>
          </div>
        ))}
      </div>

      {/* Co-curricular */}
      <div className="manga-panel manga-panel-dark p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 bg-[#fbbf24]">
            <Trophy className="w-5 h-5 text-[#1a1a1a]" />
          </div>
          <h3 className="font-black uppercase text-[#fbbf24]">Activities</h3>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="thought-bubble">Member - Rotaract Club</div>
          <div
            className="thought-bubble cursor-pointer hover:border-[#dc2626]"
            onClick={() => {
              setSelectedCert({
                image: '/images/achievements/blood-donation-cert.png',
                title: 'Blood Donation Certificate - Lions Club'
              });
              setShowModal(true);
            }}
          >
            🩸 Blood Donor (2 donations) - Click to view cert!
          </div>
        </div>
      </div>

      {/* Modals */}
      <CertificateModal isOpen={showModal} onClose={() => setShowModal(false)} imageSrc={selectedCert.image} title={selectedCert.title} />

      {showAchievementModal && selectedAchievement && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setShowAchievementModal(false)}>
          <div className="relative bg-white max-w-2xl w-full max-h-[90vh] manga-panel overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-[#1a1a1a] text-white px-6 py-4 flex items-center justify-between z-10 border-b-4 border-[#fbbf24]">
              <h3 className="font-black uppercase">{selectedAchievement.title}</h3>
              <button onClick={() => setShowAchievementModal(false)} className="p-2 hover:bg-white/10 rounded"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {selectedAchievement.image && (
                <div className="cursor-pointer group" onClick={() => setFullImageView(selectedAchievement.image)}>
                  <div className="thought-bubble py-1 px-3 text-xs font-bold mb-2 inline-block">🏆 Trophy</div>
                  <div className="relative overflow-hidden border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]">
                    <img src={selectedAchievement.image} alt="Trophy" className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white p-2 rounded"><Maximize2 className="w-6 h-6 text-[#1a1a1a]" /></div>
                    </div>
                  </div>
                </div>
              )}
              {selectedAchievement.teamImage && (
                <div className="cursor-pointer group" onClick={() => setFullImageView(selectedAchievement.teamImage!)}>
                  <div className="thought-bubble py-1 px-3 text-xs font-bold mb-2 inline-block">👥 Team</div>
                  <div className="relative overflow-hidden border-4 border-[#1a1a1a] shadow-[4px_4px_0_#1a1a1a]">
                    <img src={selectedAchievement.teamImage} alt="Team" className="w-full h-48 object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white p-2 rounded"><Maximize2 className="w-6 h-6 text-[#1a1a1a]" /></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-gray-100 border-t-2 border-[#1a1a1a] p-4 flex justify-center">
              <button onClick={() => setShowAchievementModal(false)} className="manga-button text-sm">Close</button>
            </div>
          </div>
        </div>
      )}

      {fullImageView && (
        <div className="fixed inset-0 z-[60] bg-black/95 overflow-y-auto" onClick={() => setFullImageView(null)}>
          <button className="fixed top-4 right-4 z-[70] bg-white p-3 rounded-full shadow-lg hover:bg-gray-100" onClick={() => setFullImageView(null)}>
            <X className="w-6 h-6 text-[#1a1a1a]" />
          </button>
          <div className="min-h-screen flex items-start justify-center p-4 pt-16">
            <img src={fullImageView} alt="Full view" className="max-w-full w-auto h-auto border-4 border-white shadow-2xl" onClick={(e) => e.stopPropagation()} />
          </div>
        </div>
      )}
    </section>
  );
}
