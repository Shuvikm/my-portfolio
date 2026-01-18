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
            const duration = 6 + (index % 3); // Much faster: 6-9 seconds instead of 15-25
            const depthVariation = index % 2 === 0 ? 180 : -180;

            // Set initial position
            gsap.set(panel, {
                rotationY: angle,
                rotationX: index * 12,
                z: depthVariation,
            });

            // Create faster orbital animation timeline
            const tl = gsap.timeline({ repeat: -1 });

            tl.to(panel, {
                rotationY: `+=${360}`,
                rotationX: `+=${180}`,
                z: -depthVariation,
                duration: duration,
                ease: 'none',
            }).to(panel, {
                z: depthVariation,
                duration: duration / 2,
                ease: 'sine.inOut',
            }, 0);

            // Faster floating animation
            gsap.to(panel, {
                y: '+=25',
                duration: 2 + (index % 2) * 0.5, // Faster floating: 2-2.5 seconds
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
