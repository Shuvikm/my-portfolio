import { useState, useEffect, useCallback, useRef } from 'react';
import {
    ChevronLeft,
    ChevronRight,
    Play,
    Pause,
    Maximize2,
    X,
    Heart,
    Share2,
    Twitter,
    Facebook,
    ThumbsUp,
    ZoomIn,
    ZoomOut,
    Info
} from 'lucide-react';

// Top 10 Best Manga/Anime of All Time - Iconic Panels with descriptions
const mangaSlides = [
    {
        image: '/images/manga-one-piece.png',
        hint: 'ワンピース',
        subHint: 'I Will Become the Pirate King!',
        title: 'One Piece',
        description: 'Monkey D. Luffy declares his dream to become the Pirate King. One of the most iconic shonen moments that defined a generation.',
        episode: 'Chapter 1 / Episode 1',
        year: '1997',
    },
    {
        image: '/images/manga-naruto.png',
        hint: 'ナルト',
        subHint: 'Believe It! Rasengan!',
        title: 'Naruto',
        description: 'Naruto Uzumaki mastering the Rasengan, proving his ninja way. The moment that showed his growth as a shinobi.',
        episode: 'Chapter 167 / Episode 94',
        year: '1999',
    },
    {
        image: '/images/manga-gojo-sukuna.png',
        hint: '呪術廻戦',
        subHint: 'The Strongest vs The King of Curses',
        title: 'Jujutsu Kaisen',
        description: 'Gojo Satoru vs Ryomen Sukuna - the battle between the strongest sorcerer and the King of Curses.',
        episode: 'Chapter 223+',
        year: '2018',
    },
    {
        image: '/images/manga-dio-jotaro.png',
        hint: 'ジョジョの奇妙な冒険',
        subHint: 'Yare Yare Daze... ORA ORA ORA!',
        title: "JoJo's Bizarre Adventure",
        description: 'The legendary confrontation between Jotaro Kujo and DIO. Star Platinum vs The World in an epic stand battle.',
        episode: 'Chapter 264 / Episode 47',
        year: '1989',
    },
    {
        image: '/images/manga-vegeta-goku.png',
        hint: 'ドラゴンボール',
        subHint: 'Pride vs Determination',
        title: 'Dragon Ball',
        description: 'The eternal rivalry between Goku and Vegeta. Two Saiyans pushing each other beyond their limits.',
        episode: 'Multiple Arcs',
        year: '1984',
    },
    {
        image: '/images/manga-allmight-afo.png',
        hint: '僕のヒーローアカデミア',
        subHint: 'Plus Ultra! Symbol of Peace',
        title: 'My Hero Academia',
        description: 'All Might vs All For One - the Symbol of Peace gives everything in his final battle.',
        episode: 'Chapter 92 / Episode 49',
        year: '2014',
    },
    {
        image: '/images/manga-bebop-style.png',
        hint: 'カウボーイビバップ',
        subHint: 'See You Space Cowboy...',
        title: 'Cowboy Bebop',
        description: 'The crew of the Bebop in their iconic style. A masterpiece of anime that defined the space western genre.',
        episode: 'Episode 26 - The Real Folk Blues',
        year: '1998',
    },
    {
        image: '/images/manga-jojo-style.png',
        hint: 'ゴゴゴゴ',
        subHint: 'Menacing... ゴゴゴゴ',
        title: 'JoJo Style',
        description: 'The legendary menacing aura (ゴゴゴゴ) that became a cultural phenomenon and meme sensation.',
        episode: 'Throughout the Series',
        year: '1987',
    },
    {
        image: '/images/manga-attack-on-titan.png',
        hint: '進撃の巨人',
        subHint: 'On That Day, Humanity Received a Grim Reminder',
        title: 'Attack on Titan',
        description: 'The Colossal Titan appears over Wall Maria. The moment that changed anime forever.',
        episode: 'Chapter 1 / Episode 1',
        year: '2009',
    },
    {
        image: '/images/manga-jjk-style.png',
        hint: '領域展開',
        subHint: 'Domain Expansion!',
        title: 'Domain Expansion',
        description: 'The ultimate jujutsu technique - Domain Expansion. Guarantees a hit and creates a personal realm.',
        episode: 'Various Chapters',
        year: '2018',
    },
];

export default function MangaGallery() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isZoomed, setIsZoomed] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [favorites, setFavorites] = useState<number[]>([]);
    const [votes, setVotes] = useState<{ [key: number]: number }>({});
    const [showShareMenu, setShowShareMenu] = useState(false);
    const galleryRef = useRef<HTMLDivElement>(null);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // Load favorites and votes from localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('mangaFavorites');
        const savedVotes = localStorage.getItem('mangaVotes');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
        if (savedVotes) setVotes(JSON.parse(savedVotes));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('mangaFavorites', JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem('mangaVotes', JSON.stringify(votes));
    }, [votes]);

    const goToSlide = useCallback((index: number) => {
        setIsTransitioning(true);
        setShowHint(false);
        setTimeout(() => {
            setCurrentSlide(index);
            setIsTransitioning(false);
        }, 500);
    }, []);

    const handlePrev = useCallback(() => {
        const newIndex = currentSlide === 0 ? mangaSlides.length - 1 : currentSlide - 1;
        goToSlide(newIndex);
    }, [currentSlide, goToSlide]);

    const handleNext = useCallback(() => {
        const newIndex = currentSlide === mangaSlides.length - 1 ? 0 : currentSlide + 1;
        goToSlide(newIndex);
    }, [currentSlide, goToSlide]);

    // Keyboard Navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') {
                setIsFullscreen(false);
                setIsZoomed(false);
            }
            if (e.key === ' ') {
                e.preventDefault();
                setIsPlaying(prev => !prev);
            }
            if (e.key === 'f') setIsFullscreen(prev => !prev);
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

    // Touch Swipe Support
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) handleNext();
            else handlePrev();
        }
    };

    // Auto-play
    useEffect(() => {
        if (!isPlaying || isFullscreen) return;

        const hintTimer = setTimeout(() => setShowHint(true), 1500);
        const slideTimer = setTimeout(() => handleNext(), 5000);

        return () => {
            clearTimeout(hintTimer);
            clearTimeout(slideTimer);
        };
    }, [currentSlide, isPlaying, isFullscreen, handleNext]);

    // Toggle Favorite
    const toggleFavorite = (index: number) => {
        setFavorites(prev =>
            prev.includes(index)
                ? prev.filter(i => i !== index)
                : [...prev, index]
        );
    };

    // Vote for panel
    const voteForPanel = (index: number) => {
        setVotes(prev => ({
            ...prev,
            [index]: (prev[index] || 0) + 1
        }));
    };

    // Share functionality
    const sharePanel = (platform: string) => {
        const slide = mangaSlides[currentSlide];
        const shareText = `Check out this iconic ${slide.title} panel! ${slide.subHint}`;
        const shareUrl = window.location.href;

        if (platform === 'twitter') {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        } else if (platform === 'facebook') {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        } else if (platform === 'copy') {
            navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
            alert('Link copied to clipboard!');
        }
        setShowShareMenu(false);
    };

    const slide = mangaSlides[currentSlide];
    const isFavorited = favorites.includes(currentSlide);
    const voteCount = votes[currentSlide] || 0;

    return (
        <>
            <section id="manga-gallery" className="manga-section" ref={galleryRef}>
                {/* Section Header */}
                <div className="manga-panel p-6 mb-4">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                            <div className="exclaim-box">00</div>
                            <h2 className="manga-title text-xl sm:text-2xl md:text-3xl text-[#1a1a1a]">MY FAVORITE MANGA PANELS</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsPlaying(!isPlaying)}
                                className="manga-button-sm"
                                title={isPlaying ? 'Pause (Space)' : 'Play (Space)'}
                            >
                                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsFullscreen(true)}
                                className="manga-button-sm"
                                title="Fullscreen (F)"
                            >
                                <Maximize2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Cinema Display */}
                <div
                    className="manga-panel manga-panel-dark p-0 mb-4 overflow-hidden relative"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="manga-cinema-display">
                        <div className="manga-cinema-frame">
                            <div
                                className={`manga-cinema-slide ${isTransitioning ? 'transitioning' : ''}`}
                                onClick={() => setIsFullscreen(true)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={slide.image} alt={slide.title} className="manga-cinema-image" key={currentSlide} />

                                <div className={`manga-cinema-overlay ${showHint ? 'show' : ''}`}>
                                    <div className="manga-cinema-info">
                                        <div className="manga-cinema-hint">{slide.hint}</div>
                                        <div className="manga-cinema-title">{slide.title}</div>
                                        <div className="manga-cinema-subhint">{slide.subHint}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="manga-cinema-progress">
                                <div
                                    className="manga-cinema-progress-bar"
                                    style={{
                                        animationDuration: isPlaying ? '5s' : '0s',
                                        animationPlayState: isPlaying ? 'running' : 'paused'
                                    }}
                                    key={`progress-${currentSlide}`}
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <button onClick={handlePrev} className="manga-cinema-nav manga-cinema-prev" aria-label="Previous">
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button onClick={handleNext} className="manga-cinema-nav manga-cinema-next" aria-label="Next">
                            <ChevronRight className="w-8 h-8" />
                        </button>

                        {/* Counter & Actions */}
                        <div className="manga-cinema-counter">
                            <span className="text-[#fbbf24] font-black text-2xl">{currentSlide + 1}</span>
                            <span className="text-white/50 mx-2">/</span>
                            <span className="text-white/70">{mangaSlides.length}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="manga-cinema-actions">
                            <button
                                onClick={() => toggleFavorite(currentSlide)}
                                className={`manga-action-btn ${isFavorited ? 'active' : ''}`}
                                title="Favorite"
                            >
                                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                            </button>
                            <button
                                onClick={() => voteForPanel(currentSlide)}
                                className="manga-action-btn"
                                title="Vote"
                            >
                                <ThumbsUp className="w-5 h-5" />
                                {voteCount > 0 && <span className="vote-count">{voteCount}</span>}
                            </button>
                            <button
                                onClick={() => setShowShareMenu(!showShareMenu)}
                                className="manga-action-btn"
                                title="Share"
                            >
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setShowInfo(!showInfo)}
                                className={`manga-action-btn ${showInfo ? 'active' : ''}`}
                                title="Info"
                            >
                                <Info className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Share Menu */}
                        {showShareMenu && (
                            <div className="manga-share-menu">
                                <button onClick={() => sharePanel('twitter')}><Twitter className="w-4 h-4" /> Twitter</button>
                                <button onClick={() => sharePanel('facebook')}><Facebook className="w-4 h-4" /> Facebook</button>
                                <button onClick={() => sharePanel('copy')}>📋 Copy Link</button>
                            </div>
                        )}

                        {/* Info Panel */}
                        {showInfo && (
                            <div className="manga-info-panel">
                                <h3>{slide.title}</h3>
                                <p className="episode">{slide.episode} • {slide.year}</p>
                                <p className="description">{slide.description}</p>
                            </div>
                        )}
                    </div>

                    {/* Thumbnails */}
                    <div className="manga-cinema-thumbnails">
                        {mangaSlides.map((s, i) => (
                            <button
                                key={i}
                                onClick={() => goToSlide(i)}
                                className={`manga-cinema-thumb ${i === currentSlide ? 'active' : ''} ${favorites.includes(i) ? 'favorited' : ''}`}
                            >
                                <img src={s.image} alt={s.title} />
                                <div className="thumb-number">{i + 1}</div>
                                {favorites.includes(i) && <Heart className="thumb-heart" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Instructions */}
                <div className="manga-panel p-4 text-center">
                    <div className="thought-bubble inline-block text-sm">
                        ⌨️ Arrow keys to navigate • Space to play/pause • F for fullscreen • Swipe on mobile 📱
                    </div>
                </div>
            </section>

            {/* Fullscreen Lightbox */}
            {isFullscreen && (
                <div className="manga-lightbox" onClick={() => !isZoomed && setIsFullscreen(false)}>
                    <button className="lightbox-close" onClick={() => setIsFullscreen(false)}>
                        <X className="w-8 h-8" />
                    </button>

                    <div
                        className={`lightbox-image-container ${isZoomed ? 'zoomed' : ''}`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="lightbox-image"
                            onClick={() => setIsZoomed(!isZoomed)}
                        />
                    </div>

                    <div className="lightbox-info">
                        <h3>{slide.hint}</h3>
                        <p>{slide.title} - {slide.subHint}</p>
                    </div>

                    <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); handlePrev(); }}>
                        <ChevronLeft className="w-10 h-10" />
                    </button>
                    <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); handleNext(); }}>
                        <ChevronRight className="w-10 h-10" />
                    </button>

                    <div className="lightbox-zoom">
                        <button onClick={() => setIsZoomed(!isZoomed)}>
                            {isZoomed ? <ZoomOut className="w-6 h-6" /> : <ZoomIn className="w-6 h-6" />}
                        </button>
                    </div>

                    <div className="lightbox-counter">
                        {currentSlide + 1} / {mangaSlides.length}
                    </div>
                </div>
            )}
        </>
    );
}
