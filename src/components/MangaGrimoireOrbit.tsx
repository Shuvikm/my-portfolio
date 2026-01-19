import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import '../styles/grimoire-animation.css';

interface MangaGrimoireOrbitProps {
    images: string[];
}

export default function MangaGrimoireOrbit({ images }: MangaGrimoireOrbitProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelsRef = useRef<HTMLDivElement[]>([]);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {
        if (!containerRef.current || panelsRef.current.length === 0) return;

        const panels = panelsRef.current;

        // Proper 3D orbital animation like Julius Novachrono's grimoire
        panels.forEach((panel, index) => {
            const totalPanels = panels.length;
            const angleOffset = (360 / totalPanels) * index;
            const duration = 4; // Faster rotation (was 8)
            const orbitRadius = 300;

            // Grimoire-style 3D orbital animation
            gsap.to(panel, {
                rotation: 360,
                duration: duration,
                ease: 'none',
                repeat: -1,
                modifiers: {
                    rotation: function (rotation) {
                        const currentRotation = parseFloat(rotation) + angleOffset;
                        const rad = (currentRotation * Math.PI) / 180;

                        // Calculate orbital position
                        const x = Math.cos(rad) * orbitRadius;
                        const z = Math.sin(rad) * orbitRadius;

                        // Apply 3D transform with orbital position and spin
                        gsap.set(panel, {
                            x: x,
                            y: 0,
                            z: z,
                            rotationY: currentRotation - 90, // Face outwards for better visibility
                            rotationX: -10, // Slight tilt to avoid perfect edge-on visibility
                            transformPerspective: 1000,
                        });

                        return rotation;
                    },
                },

            });

            // Subtle floating
            gsap.to(panel, {
                y: '+=15',
                duration: 3,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1,
                delay: index * 0.2,
            });
        });

        return () => {
            gsap.killTweensOf(panels);
        };
    }, [images]);

    // Handle panel click to show popup
    const handlePanelClick = (image: string) => {
        setSelectedImage(image);
        setShowPopup(true);
    };

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
                        onClick={() => handlePanelClick(image)}
                    >
                        <div className="grimoire-panel-inner">
                            <img src={image} alt={`Manga panel ${index + 1}`} />
                            <div className="grimoire-panel-glow"></div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pop-up Modal */}
            {showPopup && (
                <div className="grimoire-popup-overlay" onClick={() => setShowPopup(false)}>
                    <div className="grimoire-popup-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Selected manga panel" />
                        <button className="grimoire-popup-close" onClick={() => setShowPopup(false)}>
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
