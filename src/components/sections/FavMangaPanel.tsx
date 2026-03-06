import { useState, useEffect, useRef, useCallback, memo } from 'react';
import '../../styles/grimoire-animation.css';

interface MangaEntry {
    src: string;
    title: string;
    series: string;
}

/* ---------------------------------------------------------------
   Add your favourite manga panels here.
   If the image path is wrong / file missing the card shows a
   styled placeholder automatically — no crashes.
--------------------------------------------------------------- */
const MANGA_PANELS: MangaEntry[] = [
    { src: '/images/grimoire/manga-1.jpg', title: 'Panel 01', series: 'My Favourites' },
    { src: '/images/grimoire/manga-2.jpg', title: 'Panel 02', series: 'My Favourites' },
    { src: '/images/grimoire/manga-3.jpg', title: 'Panel 03', series: 'My Favourites' },
    { src: '/images/grimoire/manga-4.jpg', title: 'Panel 04', series: 'My Favourites' },
    { src: '/images/grimoire/manga-5.jpg', title: 'Panel 05', series: 'My Favourites' },
    { src: '/images/grimoire/manga-6.jpg', title: 'Panel 06', series: 'My Favourites' },
    { src: '/images/grimoire/manga-7.jpg', title: 'Panel 07', series: 'My Favourites' },
    { src: '/images/grimoire/manga-8.jpg', title: 'Panel 08', series: 'My Favourites' },
    { src: '/images/grimoire/manga-9.jpg', title: 'Panel 09', series: 'My Favourites' },
    { src: '/images/grimoire/manga-10.jpg', title: 'Panel 10', series: 'My Favourites' },
    { src: '/images/grimoire/manga-11.jpg', title: 'Panel 11', series: 'My Favourites' },
    { src: '/images/grimoire/manga-12.jpg', title: 'Panel 12', series: 'My Favourites' },
    { src: '/images/grimoire/manga-13.jpg', title: 'Panel 13', series: 'My Favourites' },
    { src: '/images/grimoire/manga-14.jpg', title: 'Panel 14', series: 'My Favourites' },
    { src: '/images/grimoire/manga-15.jpg', title: 'Panel 15', series: 'My Favourites' },
    { src: '/images/grimoire/manga-16.jpg', title: 'Panel 16', series: 'My Favourites' },
    { src: '/images/grimoire/manga-17.jpg', title: 'Panel 17', series: 'My Favourites' },
    { src: '/images/grimoire/manga-18.jpg', title: 'Panel 18', series: 'My Favourites' },
    { src: '/images/grimoire/manga-19.jpg', title: 'Panel 19', series: 'My Favourites' },
];

type CardPos = 'center' | 'up-1' | 'up-2' | 'down-1' | 'down-2' | 'hidden-card';

function getPosition(idx: number, active: number, total: number): CardPos {
    const diff = ((idx - active) % total + total) % total;
    const norm = diff > total / 2 ? diff - total : diff;
    const map: Record<number, CardPos> = { 0: 'center', 1: 'down-1', 2: 'down-2', '-1': 'up-1', '-2': 'up-2' };
    return map[norm] ?? 'hidden-card';
}

function MangaCard({ entry, pos, onClick }: { entry: MangaEntry; pos: CardPos; onClick: () => void }) {
    const [imgState, setImgState] = useState<'loading' | 'ok' | 'error'>('loading');

    return (
        <div className={`grimoire-card ${pos}`} onClick={onClick}>
            {imgState === 'loading' && (
                <div className="image-loading"><div className="spinner" /></div>
            )}
            {imgState === 'error' && (
                <div className="image-error" style={{ flexDirection: 'column', gap: '0.5rem', textAlign: 'center', padding: '1rem' }}>
                    <div style={{ fontSize: '2.5rem' }}>📖</div>
                    <div style={{ fontWeight: 900, fontSize: '0.85rem', textTransform: 'uppercase' }}>{entry.title}</div>
                    <div style={{ fontSize: '0.7rem', opacity: 0.6 }}>{entry.series}</div>
                </div>
            )}
            <img
                src={entry.src}
                alt={`${entry.series} — ${entry.title}`}
                loading="lazy"
                decoding="async"
                style={{ display: imgState === 'ok' ? 'block' : 'none' }}
                onLoad={() => setImgState('ok')}
                onError={() => setImgState('error')}
            />
        </div>
    );
}

const FavMangaPanel = memo(function FavMangaPanel() {
    const [active, setActive] = useState(0);
    const [modal, setModal] = useState<MangaEntry | null>(null);
    const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    // Only render when section is scrolled into view
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold: 0.05 }
        );
        if (sectionRef.current) obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    const next = useCallback(() => setActive(a => (a + 1) % MANGA_PANELS.length), []);
    const prev = useCallback(() => setActive(a => (a - 1 + MANGA_PANELS.length) % MANGA_PANELS.length), []);

    // Auto-rotate every 4 s
    useEffect(() => {
        if (!inView) return;
        autoRef.current = setInterval(next, 4000);
        return () => { if (autoRef.current) clearInterval(autoRef.current); };
    }, [inView, next]);

    // Keyboard nav
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next();
            if (e.key === 'Escape') setModal(null);
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [next, prev]);

    return (
        <section id="manga" ref={sectionRef} className="manga-section">
            {/* Header */}
            <div className="manga-panel p-6 mb-4">
                <div className="flex items-center gap-8">
                    <div className="exclaim-box" style={{ background: '#dc2626', color: '#fff' }}>📖</div>
                    <h2 className="manga-title text-3xl sm:text-4xl tracking-widest">FAV PANELS</h2>
                </div>
            </div>

            {/* Caption */}
            <div className="manga-panel p-4 mb-4 text-center">
                <div className="thought-bubble inline-block text-sm">
                    My favourite manga moments — panels that hit different ✨
                </div>
            </div>

            {/* 3D Carousel */}
            {inView && (
                <div className="manga-panel p-0 overflow-hidden mb-4">
                    <div className="grimoire-main-container">
                        {/* Carousel */}
                        <div className="grimoire-carousel-section">
                            <div className="grimoire-carousel-container">
                                <div className="grimoire-carousel-track">
                                    {MANGA_PANELS.map((panel, i) => (
                                        <MangaCard
                                            key={panel.src}
                                            entry={panel}
                                            pos={getPosition(i, active, MANGA_PANELS.length)}
                                            onClick={() => setModal(panel)}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="grimoire-controls-section">
                            <div className="grimoire-nav-controls">
                                <button className="grimoire-nav-arrow" onClick={prev} aria-label="Previous">▲</button>
                                <button className="grimoire-nav-arrow" onClick={next} aria-label="Next">▼</button>
                            </div>

                            {/* Active info */}
                            <div className="thought-bubble text-center px-4 py-3">
                                <div className="font-black text-sm uppercase">{MANGA_PANELS[active].title}</div>
                                <div className="text-xs opacity-60 mt-1">{MANGA_PANELS[active].series}</div>
                            </div>

                            {/* Dots */}
                            <div className="grimoire-dots">
                                {MANGA_PANELS.map((_, i) => (
                                    <button
                                        key={i}
                                        className={`grimoire-dot ${i === active ? 'active' : ''}`}
                                        onClick={() => setActive(i)}
                                        aria-label={`Panel ${i + 1}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal lightbox */}
            {modal && (
                <div className="grimoire-modal" onClick={() => setModal(null)} role="dialog" aria-label="Full panel view">
                    <button className="close-modal" onClick={() => setModal(null)} aria-label="Close">×</button>
                    <img src={modal.src} alt={modal.title} />
                </div>
            )}
        </section>
    );
});

export default FavMangaPanel;
