import { useEffect, useState } from 'react';

interface Popup {
    id: number;
    text: string;
    x: number;
    y: number;
    rotation: number;
    scale: number;
}

const popupTexts = [
    { jp: 'ドカーン', en: 'BOOM!' },
    { jp: 'バーン', en: 'BAM!' },
    { jp: 'ドーン', en: 'WHAM!' },
    { jp: 'ガーン', en: 'POW!' },
    { jp: 'ズドン', en: 'KABOOM!' },
    { jp: 'バキッ', en: 'CRACK!' },
    { jp: 'ドカッ', en: 'SMASH!' },
    { jp: 'ゴゴゴ', en: 'MENACING' },
    { jp: 'キラーン', en: 'SHINE!' },
    { jp: 'ビシッ', en: 'SNAP!' },
];

export default function MangaPopups() {
    const [popups, setPopups] = useState<Popup[]>([]);

    useEffect(() => {
        const createPopup = () => {
            const randomEffect = popupTexts[Math.floor(Math.random() * popupTexts.length)];
            const newPopup: Popup = {
                id: Date.now() + Math.random(),
                text: Math.random() > 0.5 ? randomEffect.jp : randomEffect.en,
                x: Math.random() * 90 + 5, // 5% to 95%
                y: Math.random() * 80 + 10, // 10% to 90%
                rotation: (Math.random() - 0.5) * 30, // -15deg to 15deg
                scale: Math.random() * 0.5 + 0.8, // 0.8 to 1.3
            };

            setPopups(prev => [...prev, newPopup]);

            // Remove popup after animation
            setTimeout(() => {
                setPopups(prev => prev.filter(p => p.id !== newPopup.id));
            }, 3000);
        };

        // Create initial popups
        const initialDelay = setTimeout(() => {
            createPopup();
        }, 2000);

        // Create popups periodically
        const interval = setInterval(createPopup, 8000);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, []);

    // Trigger popup on scroll
    useEffect(() => {
        let lastScroll = 0;
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            const scrollDiff = Math.abs(currentScroll - lastScroll);

            // Trigger popup on significant scroll
            if (scrollDiff > 300) {
                const randomEffect = popupTexts[Math.floor(Math.random() * popupTexts.length)];
                const newPopup: Popup = {
                    id: Date.now() + Math.random(),
                    text: randomEffect.en,
                    x: Math.random() * 80 + 10,
                    y: Math.random() * 70 + 15,
                    rotation: (Math.random() - 0.5) * 25,
                    scale: Math.random() * 0.4 + 0.9,
                };
                setPopups(prev => [...prev, newPopup]);

                setTimeout(() => {
                    setPopups(prev => prev.filter(p => p.id !== newPopup.id));
                }, 2500);

                lastScroll = currentScroll;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {popups.map(popup => (
                <div
                    key={popup.id}
                    className="absolute manga-popup-effect"
                    style={{
                        left: `${popup.x}%`,
                        top: `${popup.y}%`,
                        transform: `rotate(${popup.rotation}deg) scale(${popup.scale})`,
                    }}
                >
                    {/* Main popup with starburst effect */}
                    <div className="relative">
                        <div className="popup-burst">{popup.text}</div>
                    </div>
                </div>
            ))}

            <style>{`
        .manga-popup-effect {
          animation: popup-appear 3s ease-out forwards;
        }

        .popup-burst {
          position: relative;
          background: #fbbf24;
          color: #1a1a1a;
          padding: 16px 32px;
          font-weight: 900;
          font-size: 2.5rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          border: 5px solid #1a1a1a;
          box-shadow: 
            6px 6px 0 #1a1a1a,
            0 0 30px rgba(251, 191, 36, 0.5);
          clip-path: polygon(
            50% 0%, 61% 10%, 75% 5%, 80% 20%, 95% 15%, 90% 30%,
            100% 40%, 95% 55%, 100% 70%, 85% 75%, 85% 90%, 70% 85%,
            60% 100%, 50% 90%, 40% 100%, 30% 85%, 15% 90%, 15% 75%,
            0% 70%, 5% 55%, 0% 40%, 10% 30%, 5% 15%, 20% 20%,
            25% 5%, 39% 10%
          );
          white-space: nowrap;
          text-shadow: 
            3px 3px 0 rgba(0,0,0,0.2),
            -1px -1px 0 #fff;
        }

        .popup-burst::before {
          content: '';
          position: absolute;
          inset: -10px;
          background: radial-gradient(circle, rgba(251,191,36,0.3) 0%, transparent 70%);
          animation: pulse-glow 0.5s ease-out infinite alternate;
          z-index: -1;
        }

        .popup-burst::after {
          content: '';
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255,255,255,0.1) 10px,
            rgba(255,255,255,0.1) 20px
          );
        }

        @keyframes popup-appear {
          0% {
            opacity: 0;
            transform: scale(0) rotate(-180deg);
          }
          15% {
            opacity: 1;
            transform: scale(1.2) rotate(5deg);
          }
          25% {
            transform: scale(0.95) rotate(-2deg);
          }
          35% {
            transform: scale(1.05) rotate(1deg);
          }
          45% {
            transform: scale(1) rotate(0deg);
          }
          85% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
          }
          100% {
            opacity: 0;
            transform: scale(0.5) rotate(20deg);
          }
        }

        @keyframes pulse-glow {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1.1);
            opacity: 0.6;
          }
        }

        @media (max-width: 768px) {
          .popup-burst {
            font-size: 1.5rem;
            padding: 12px 24px;
            border-width: 3px;
          }
        }
      `}</style>
        </div>
    );
}
