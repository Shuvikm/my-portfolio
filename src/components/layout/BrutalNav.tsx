import { useState, useEffect } from 'react';

const navLinks = [
    { href: '#about', label: 'ABOUT' },
    { href: '#skills', label: 'STACK' },
    { href: '#projects', label: 'WORK' },
    { href: '#journey', label: 'JOURNEY' },
    { href: '#github-activity', label: 'GITHUB' },
    { href: '#game', label: 'LABS' },
];

export default function BrutalNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Close menu on link click
    const handleNavClick = () => setMenuOpen(false);

    return (
        <nav className={`brutal-nav${scrolled ? ' brutal-nav--scrolled' : ''}`}>
            {/* Logo */}
            <a href="#home" className="nav-logo magnetic" style={{ textDecoration: 'none' }}>
                SHUVIK M
            </a>

            {/* Desktop links */}
            <ul className="nav-menu">
                {navLinks.map(({ href, label }) => (
                    <li key={href}>
                        <a href={href} className="nav-link magnetic" data-text={label}>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* CTA */}
            <a
                href="#contact"
                className="cta-btn magnetic"
                style={{ textDecoration: 'none', display: 'inline-block' }}
            >
                <span>LET'S TALK</span>
            </a>

            {/* Hamburger – mobile only */}
            <button
                className="nav-hamburger"
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(v => !v)}
            >
                <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
                <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
                <span className={`ham-bar${menuOpen ? ' open' : ''}`} />
            </button>

            {/* Mobile drawer */}
            {menuOpen && (
                <div className="nav-drawer" role="dialog" aria-modal="true">
                    <ul className="nav-drawer-list">
                        {navLinks.map(({ href, label }) => (
                            <li key={href}>
                                <a href={href} className="nav-drawer-link" onClick={handleNavClick}>
                                    {label}
                                </a>
                            </li>
                        ))}
                        <li>
                            <a href="#contact" className="nav-drawer-link nav-drawer-cta" onClick={handleNavClick}>
                                LET'S TALK
                            </a>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
