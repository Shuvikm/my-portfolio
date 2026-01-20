import { useState, useEffect, useCallback } from 'react';

interface GrimoireOrbitalProps {
    images: string[];  // Array of manga panel images
    grimoireImage: string;  // Central grimoire book image
    onImageClick?: (imageSrc: string) => void;  // Optional click handler
}

export default function GrimoireOrbital({ images, grimoireImage, onImageClick }: GrimoireOrbitalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    const updateCarousel = useCallback((newIndex: number) => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((newIndex + images.length) % images.length);
        setTimeout(() => setIsAnimating(false), 800);
    }, [images.length, isAnimating]);

    const handleImageClick = (imageSrc: string, index: number) => {
        if (index === currentIndex) {
            if (onImageClick) {
                onImageClick(imageSrc);
            } else {
                setSelectedImage(imageSrc);
                setShowModal(true);
            }
        } else {
            updateCarousel(index);
        }
    };

    // Keyboard support and Wheel support
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') updateCarousel(currentIndex - 1);
            if (e.key === 'ArrowDown') updateCarousel(currentIndex + 1);
        };

        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) > 50) {
                if (e.deltaY > 0) updateCarousel(currentIndex + 1);
                else updateCarousel(currentIndex - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentIndex, updateCarousel]);

    const getCardClass = (index: number) => {
        const offset = (index - currentIndex + images.length) % images.length;
        if (offset === 0) return 'center';
        if (offset === 1) return 'down-1';
        if (offset === 2) return 'down-2';
        if (offset === images.length - 1) return 'up-1';
        if (offset === images.length - 2) return 'up-2';
        return 'hidden-card';
    };

    return (
        <div className="grimoire-main-container">
            <div className="grimoire-carousel-section">
                <div className="grimoire-carousel-container">
                    <div className="grimoire-carousel-track">
                        {images.map((imageSrc, index) => (
                            <div
                                key={index}
                                className={`grimoire-card ${getCardClass(index)}`}
                                onClick={() => handleImageClick(imageSrc, index)}
                            >
                                <img src={imageSrc} alt={`Manga Panel ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grimoire-controls-section">
                <div className="grimoire-nav-controls">
                    <button className="grimoire-nav-arrow up" onClick={() => updateCarousel(currentIndex - 1)}>
                        <span className="arrow-icon">▲</span>
                    </button>
                    <button className="grimoire-nav-arrow down" onClick={() => updateCarousel(currentIndex + 1)}>
                        <span className="arrow-icon">▼</span>
                    </button>
                </div>

                <div className="grimoire-dots">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            className={`grimoire-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => updateCarousel(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Central Grimoire Decorative Element - positioned behind or aside */}
            <div className="grimoire-decorative">
                <img src={grimoireImage} alt="Grimoire" className="floating-grimoire" />
            </div>

            {/* Modal */}
            {showModal && (
                <div className="grimoire-modal" onClick={() => setShowModal(false)}>
                    <img
                        src={selectedImage}
                        alt="Selected Manga"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <button className="close-modal">✕</button>
                </div>
            )}
        </div>
    );
}
