import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import '../styles/grimoire-animation.css';

interface MangaGrimoireOrbitProps {
    images: string[];
}

export default function MangaGrimoireOrbit({ images }: MangaGrimoireOrbitProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        if (!containerRef.current || panelsRef.current.length === 0) return;

        const panels = panelsRef.current;

        // Animate each panel with faster orbital paths using GSAP
        panels.forEach((panel, index) => {
            const angle = (360 / panels.length) * index;
            const duration = 6 + (index % 3); // Much faster: 6-9 seconds
            const orbitRadius = 300; // Distance from center

            // Set initial position with proper 3D transform
            gsap.set(panel, {
                rotation: angle,
                transformOrigin: 'center center',
                x: 0,
                y: 0,
            });

            // Create orbital animation with CSS transforms
            gsap.to(panel, {
                rotation: `+=${360}`,
                duration: duration,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    rotation: (r) => {
                        // Convert rotation to position on orbit
                        const radian = (parseFloat(r) * Math.PI) / 180;
                        const x = Math.cos(radian) * orbitRadius;
                        const y = Math.sin(radian) * orbitRadius;
                        gsap.set(panel, { x, y });
                        return r;
                    },
                },
            });

            // Floating animation
            gsap.to(panel, {
                y: '+=20',
                duration: 2 + (index % 2) * 0.5,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
            });
        });

        return () => {
            gsap.killTweensOf(panels);
        };
    }, [images]);

    return (
        <div className="grimoire-container">
            <div ref={containerRef} className="grimoire-orbital-space">
                <div className="grimoire-center-glow"></div>

                {images.map((image, index) => (
                    <div
                        key={index}
                        ref={(el) => {
                            if (el) panelsRef.current[index] = el;
                        }}
                        className="grimoire-panel"
                    >
                        <div className="grimoire-panel-inner">
                            <img src={image} alt={`Manga panel ${index + 1}`} />
                            <div className="grimoire-panel-glow"></div>
                        </div>
                    </div>
                ))}

                {/* Magical particles */}
                <div className="grimoire-particles">
                    {[...Array(30)].map((_, i) => (
                        <div key={i} className="particle" style={{
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 3}s` // Faster particles too
                        }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
