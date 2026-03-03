import { useState, useEffect, useCallback, useRef, memo } from 'react';

interface GrimoireOrbitalProps {
    images: string[];
    grimoireImage: string;
    onImageClick?: (imageSrc: string) => void;
}

const GrimoireOrbital = memo(function GrimoireOrbital({
    images,
    grimoireImage,
    onImageClick,
}: GrimoireOrbitalProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set([0]));
    const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());
    const [inView, setInView] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Only mount heavy carousel once container is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.05 }
        );
        if (containerRef.current) observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    // Preload a window of ±2 images around current
    useEffect(() => {
        if (!inView) return;

        const indices = [
            currentIndex,
            (currentIndex + 1) % images.length,
            (currentIndex - 1 + images.length) % images.length,
            (currentIndex + 2) % images.length,
            (currentIndex - 2 + images.length) % images.length,
        ];

        indices.forEach((idx) => {
            if (loadedImages.has(idx) || imageErrors.has(idx)) return;
            const img = new Image();
            img.onload = () =>
                setLoadedImages((prev) => new Set(prev).add(idx));
            img.onerror = () =>
                setImageErrors((prev) => new Set(prev).add(idx));
            img.src = images[idx];
        });
    }, [currentIndex, images, inView, loadedImages, imageErrors]);

    const updateCarousel = useCallback(
        (newIndex: number) => {
            if (isAnimating) return;
            setIsAnimating(true);
            setCurrentIndex((newIndex + images.length) % images.length);
            // Clear any pending timer
            if (animTimerRef.current) clearTimeout(animTimerRef.current);
            animTimerRef.current = setTimeout(() => setIsAnimating(false), 600);
        },
        [images.length, isAnimating]
    );

    // Clean up timer on unmount
    useEffect(() => () => {
        if (animTimerRef.current) clearTimeout(animTimerRef.current);
    }, []);

    // Keyboard + wheel navigation — only active when in view
    useEffect(() => {
        if (!inView) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
                updateCarousel(currentIndex - 1);
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
                updateCarousel(currentIndex + 1);
            if (e.key === 'Escape') setShowModal(false);
        };

        let wheelCooldown = false;
        const handleWheel = (e: WheelEvent) => {
            if (Math.abs(e.deltaY) < 40 || wheelCooldown) return;
            wheelCooldown = true;
            setTimeout(() => (wheelCooldown = false), 400);
            updateCarousel(currentIndex + (e.deltaY > 0 ? 1 : -1));
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('wheel', handleWheel, { passive: true });
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('wheel', handleWheel);
        };
    }, [currentIndex, updateCarousel, inView]);

    const handleImageClick = useCallback(
        (imageSrc: string, index: number) => {
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
        },
        [currentIndex, onImageClick, updateCarousel]
    );

    const getCardClass = useCallback(
        (index: number) => {
            const offset = (index - currentIndex + images.length) % images.length;
            if (offset === 0) return 'center';
            if (offset === 1) return 'down-1';
            if (offset === 2) return 'down-2';
            if (offset === images.length - 1) return 'up-1';
            if (offset === images.length - 2) return 'up-2';
            return 'hidden-card';
        },
        [currentIndex, images.length]
    );

    if (!inView) {
        // Lightweight placeholder while out of viewport
        return (
            <div
                ref={containerRef}
                className="grimoire-main-container"
                style={{ minHeight: 520, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <div style={{ color: '#fbbf24', fontFamily: "'Syncopate', sans-serif", letterSpacing: '0.2em', opacity: 0.4 }}>
                    SCROLL TO EXPLORE ▼
                </div>
            </div>
        );
    }

    return (
        <div className="grimoire-main-container" ref={containerRef}>
            <div className="grimoire-carousel-section">
                <div className="grimoire-carousel-container">
                    <div className="grimoire-carousel-track">
                        {images.map((imageSrc, index) => (
                            <div
                                key={index}
                                className={`grimoire-card ${getCardClass(index)}`}
                                onClick={() => handleImageClick(imageSrc, index)}
                                role="button"
                                aria-label={`Manga panel ${index + 1}`}
                                tabIndex={index === currentIndex ? 0 : -1}
                            >
                                {loadedImages.has(index) ? (
                                    <img
                                        src={imageSrc}
                                        alt={`Manga Panel ${index + 1}`}
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                    />
                                ) : imageErrors.has(index) ? (
                                    <div className="image-error">!</div>
                                ) : (
                                    <div className="image-loading">
                                        <div className="spinner" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="grimoire-controls-section">
                <div className="grimoire-nav-controls">
                    <button
                        className="grimoire-nav-arrow up"
                        onClick={() => updateCarousel(currentIndex - 1)}
                        aria-label="Previous panel"
                    >
                        <span className="arrow-icon">▲</span>
                    </button>
                    <button
                        className="grimoire-nav-arrow down"
                        onClick={() => updateCarousel(currentIndex + 1)}
                        aria-label="Next panel"
                    >
                        <span className="arrow-icon">▼</span>
                    </button>
                </div>

                <div className="grimoire-dots" role="tablist">
                    {images.map((_, index) => (
                        <div
                            key={index}
                            role="tab"
                            aria-selected={index === currentIndex}
                            className={`grimoire-dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => updateCarousel(index)}
                        />
                    ))}
                </div>
            </div>

            {/* Decorative grimoire book */}
            <div className="grimoire-decorative">
                <img
                    src={grimoireImage}
                    alt="Grimoire"
                    className="floating-grimoire"
                    loading="lazy"
                    decoding="async"
                />
            </div>

            {/* Lightbox modal */}
            {showModal && (
                <div
                    className="grimoire-modal"
                    onClick={() => setShowModal(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Manga panel fullscreen"
                >
                    <img
                        src={selectedImage}
                        alt="Selected Manga"
                        onClick={(e) => e.stopPropagation()}
                        decoding="async"
                    />
                    <button
                        className="close-modal"
                        onClick={() => setShowModal(false)}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
});

export default GrimoireOrbital;
