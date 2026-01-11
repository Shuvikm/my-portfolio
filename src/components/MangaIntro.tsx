import { useState, useEffect } from 'react';

// Top 10 Best Manga/Anime of All Time - Iconic Panels
const mangaSlides = [
    {
        image: '/images/manga-one-piece.png',
        hint: 'ワンピース',
        subHint: 'I Will Become the Pirate King!',
    },
    {
        image: '/images/manga-naruto.png',
        hint: 'ナルト',
        subHint: 'Believe It! Rasengan!',
    },
    {
        image: '/images/manga-gojo-sukuna.png',
        hint: '呪術廻戦',
        subHint: 'The Strongest vs The King of Curses',
    },
    {
        image: '/images/manga-dio-jotaro.png',
        hint: 'ジョジョの奇妙な冒険',
        subHint: 'Yare Yare Daze... ORA ORA ORA!',
    },
    {
        image: '/images/manga-vegeta-goku.png',
        hint: 'ドラゴンボール',
        subHint: 'Pride vs Determination',
    },
    {
        image: '/images/manga-allmight-afo.png',
        hint: '僕のヒーローアカデミア',
        subHint: 'Plus Ultra! Symbol of Peace',
    },
    {
        image: '/images/manga-bebop-style.png',
        hint: 'カウボーイビバップ',
        subHint: 'See You Space Cowboy...',
    },
    {
        image: '/images/manga-jojo-style.png',
        hint: 'ゴゴゴゴ',
        subHint: 'Menacing... ゴゴゴゴ',
    },
    {
        image: '/images/manga-attack-on-titan.png',
        hint: '進撃の巨人',
        subHint: 'On That Day, Humanity Received a Grim Reminder',
    },
    {
        image: '/images/manga-jjk-style.png',
        hint: '領域展開',
        subHint: 'Domain Expansion!',
    },
];

interface MangaIntroProps {
    onComplete: () => void;
}

export default function MangaIntro({ onComplete }: MangaIntroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isVisible, setIsVisible] = useState(true);
    const [showHint, setShowHint] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Show hint after 1.5 seconds
        const hintTimer = setTimeout(() => setShowHint(true), 1500);

        // Auto-advance to next slide after 6 seconds (more time to enjoy the image)
        const slideTimer = setTimeout(() => {
            if (currentSlide < mangaSlides.length - 1) {
                setShowHint(false);
                setTimeout(() => {
                    setCurrentSlide((prev) => prev + 1);
                }, 300);
            } else {
                // Last slide - exit intro
                handleExit();
            }
        }, 6000);

        return () => {
            clearTimeout(hintTimer);
            clearTimeout(slideTimer);
        };
    }, [currentSlide]);

    const handleExit = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false);
            onComplete();
        }, 800);
    };

    const handleSkip = () => {
        handleExit();
    };

    const handlePrev = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (currentSlide > 0) {
            setShowHint(false);
            setTimeout(() => {
                setCurrentSlide((prev) => prev - 1);
            }, 300);
        }
    };

    const handleNext = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (currentSlide < mangaSlides.length - 1) {
            setShowHint(false);
            setTimeout(() => {
                setCurrentSlide((prev) => prev + 1);
            }, 300);
        } else {
            handleExit();
        }
    };

    const handleContainerClick = () => {
        handleNext();
    };

    if (!isVisible) return null;

    const slide = mangaSlides[currentSlide];

    return (
        <div
            className={`manga-intro ${isExiting ? 'manga-intro-exit' : ''}`}
            onClick={handleContainerClick}
        >
            {/* Background Image */}
            <div
                className="manga-intro-bg"
                style={{ backgroundImage: `url(${slide.image})` }}
            />

            {/* Dark Overlay with manga lines */}
            <div className="manga-intro-overlay" />

            {/* Content */}
            <div className="manga-intro-content">
                {/* Slide Counter */}
                <div className="manga-intro-counter">
                    <span className="current">{currentSlide + 1}</span>
                    <span className="separator">/</span>
                    <span className="total">{mangaSlides.length}</span>
                </div>

                {/* Hint Text */}
                <div className={`manga-intro-hint ${showHint ? 'show' : ''}`}>
                    <div className="hint-jp">{slide.hint}</div>
                    <div className="hint-en">{slide.subHint}</div>
                </div>

                {/* Progress Bar */}
                <div className="manga-intro-progress">
                    {mangaSlides.map((_, i) => (
                        <div
                            key={i}
                            className={`progress-dot ${i === currentSlide ? 'active' : ''} ${i < currentSlide ? 'done' : ''}`}
                        />
                    ))}
                </div>

                {/* Instructions */}
                <div className="manga-intro-instructions">
                    <span>Use arrows to navigate • Click to continue</span>
                </div>
            </div>

            {/* Navigation Buttons */}
            <button
                className={`manga-intro-nav manga-intro-prev ${currentSlide === 0 ? 'disabled' : ''}`}
                onClick={handlePrev}
                disabled={currentSlide === 0}
            >
                ◀ PREV
            </button>
            <button
                className="manga-intro-nav manga-intro-next"
                onClick={handleNext}
            >
                {currentSlide === mangaSlides.length - 1 ? 'ENTER ▶' : 'NEXT ▶'}
            </button>

            {/* Skip Button */}
            <button className="manga-intro-skip" onClick={handleSkip}>
                SKIP →
            </button>

            {/* Manga Frame Border */}
            <div className="manga-intro-frame" />
        </div>
    );
}
