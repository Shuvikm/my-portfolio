import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';
import { InteractiveHoverLinks, INTERACTIVE_LINKS } from './InteractiveHoverLinks';

interface SocialItem {
    label: string;
    link: string;
}

interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    socialItems?: SocialItem[];
    displaySocials?: boolean;
    className?: string;
    logoUrl?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    isFixed?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#1e1e22', '#35353c'],
    socialItems = [],
    displaySocials = true,
    className,
    logoUrl = '/images/profile.jpg',
    menuButtonColor = '#fff',
    openMenuButtonColor = '#fff',
    accentColor = '#fbbf24',
    changeMenuColorOnOpen = true,
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose
}) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<Element[]>([]);
    const plusHRef = useRef<HTMLSpanElement | null>(null);
    const plusVRef = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);
    const textInnerRef = useRef<HTMLSpanElement | null>(null);
    const textWrapRef = useRef<HTMLSpanElement | null>(null);
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Tween | null>(null);
    const textCycleAnimRef = useRef<gsap.core.Timeline | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);
    const busyRef = useRef(false);

    useLayoutEffect(() => {
        if (preLayersRef.current) {
            preLayerElsRef.current = Array.from(preLayersRef.current.children);
        }
        if (panelRef.current) {
            const off = position === 'right' ? 101 : -101;
            gsap.set(panelRef.current, { xPercent: off });
        }
    }, [colors, position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel || !layers.length) return null;

        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }

        const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
        const socialTitle = panel.querySelector('.sm-socials-title');
        const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));

        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (numberEls.length) {
            gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }
        if (socialTitle) {
            gsap.set(socialTitle, { opacity: 0 });
        }
        if (socialLinks.length) {
            gsap.set(socialLinks, { y: 25, opacity: 0 });
        }

        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });
        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;
        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (numberEls.length) {
            const numStart = panelInsertTime + panelDuration * 0.2;
            tl.to(numberEls, { '--sm-num-opacity': 1, duration: 0.6, ease: 'none' }, numStart);
        }

        if (socialTitle || socialLinks.length) {
            const socialStart = panelInsertTime + panelDuration * 0.35;
            if (socialTitle) {
                tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, socialStart);
            }
            if (socialLinks.length) {
                tl.to(
                    socialLinks,
                    { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', stagger: 0.06 },
                    socialStart + 0.1
                );
            }
        }

        tl.eventCallback('onComplete', () => { busyRef.current = false; });
        return tl;
    }, []);

    const toggleMenu = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;

        if (!openRef.current) {
            openRef.current = true;
            setOpen(true);
            if (onMenuOpen) onMenuOpen();
        } else {
            openRef.current = false;
            setOpen(false);
            if (onMenuClose) onMenuClose();
        }
    }, [onMenuOpen, onMenuClose]);

    const playOpen = useCallback(() => {
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        const tl = buildOpenTimeline();
        if (tl) {
            openTlRef.current = tl;
            tl.play();
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        if (openTlRef.current) {
            openTlRef.current.kill();
            openTlRef.current = null;
        }

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel || !layers.length) {
            busyRef.current = false;
            return;
        }

        const tl = gsap.timeline();
        const off = position === 'right' ? 101 : -101;

        tl.to(panel, { xPercent: off, duration: 0.45, ease: 'power2.in' });
        layers.slice().reverse().forEach((el, i) => {
            tl.to(el, { xPercent: off, duration: 0.4, ease: 'power2.in' }, 0.15 + i * 0.05);
        });

        tl.eventCallback('onComplete', () => {
            busyRef.current = false;
        });
        closeTweenRef.current = tl;
    }, [position]);

    const animateIcon = useCallback((isOpen: boolean) => {
        if (!iconRef.current) return;
        if (spinTweenRef.current) spinTweenRef.current.kill();

        if (isOpen) {
            spinTweenRef.current = gsap.to(iconRef.current, { rotation: 135, duration: 0.6, ease: 'back.out(1.7)' });
        } else {
            spinTweenRef.current = gsap.to(iconRef.current, { rotation: 0, duration: 0.5, ease: 'power2.out' });
        }
    }, []);

    const animateColor = useCallback((isOpen: boolean) => {
        const btn = toggleBtnRef.current;
        if (!btn) return;
        if (colorTweenRef.current) colorTweenRef.current.kill();

        if (isOpen && changeMenuColorOnOpen) {
            colorTweenRef.current = gsap.to(btn, { color: openMenuButtonColor, duration: 0.4 });
        } else {
            colorTweenRef.current = gsap.to(btn, { color: menuButtonColor, duration: 0.4 });
        }
    }, [changeMenuColorOnOpen, openMenuButtonColor, menuButtonColor]);

    const animateText = useCallback((isOpen: boolean) => {
        if (!textInnerRef.current) return;
        if (textCycleAnimRef.current) textCycleAnimRef.current.kill();

        const tl = gsap.timeline();
        if (isOpen) {
            tl.to(textInnerRef.current, { yPercent: -50, duration: 0.5, ease: 'power3.inOut' });
        } else {
            tl.to(textInnerRef.current, { yPercent: 0, duration: 0.5, ease: 'power3.inOut' });
        }
        textCycleAnimRef.current = tl;
    }, []);

    useLayoutEffect(() => {
        if (open) {
            playOpen();
            animateIcon(true);
            animateColor(true);
            animateText(true);
        } else {
            playClose();
            animateIcon(false);
            animateColor(false);
            animateText(false);
        }
    }, [open, playOpen, playClose, animateIcon, animateColor, animateText]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (
                panelRef.current &&
                !panelRef.current.contains(target) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(target)
            ) {
                setOpen(false);
                openRef.current = false;
                if (onMenuClose) onMenuClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickAway, open, onMenuClose]);

    return (
        <div
            className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
            style={accentColor ? { '--sm-accent': accentColor } as React.CSSProperties : undefined}
            data-position={position}
            data-open={open || undefined}
        >
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
                {colors.slice(0, 4).map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />)}
            </div>
            <header className="staggered-menu-header" aria-label="Main navigation header">
                <div className="sm-logo" aria-label="Logo">
                    <img
                        src={logoUrl}
                        alt="Shuvik M"
                        className="sm-logo-img"
                        draggable={false}
                        style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                </div>
                <button
                    ref={toggleBtnRef}
                    className="sm-toggle"
                    aria-label={open ? 'Close menu' : 'Open menu'}
                    aria-expanded={open}
                    aria-controls="staggered-menu-panel"
                    onClick={toggleMenu}
                    type="button"
                    style={{ color: menuButtonColor }}
                >
                    <span ref={textWrapRef} className="sm-toggle-textWrap" aria-hidden="true">
                        <span ref={textInnerRef} className="sm-toggle-textInner">
                            {['MENU', 'CLOSE'].map((l, i) => (
                                <span className="sm-toggle-line" key={i}>
                                    {l}
                                </span>
                            ))}
                        </span>
                    </span>
                    <span ref={iconRef} className="sm-icon" aria-hidden="true">
                        <span ref={plusHRef} className="sm-icon-line" />
                        <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
                    </span>
                </button>
            </header>

            <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open}>
                <div className="sm-panel-inner">
                    <InteractiveHoverLinks links={INTERACTIVE_LINKS} />
                    {displaySocials && socialItems && socialItems.length > 0 && (
                        <div className="sm-socials" aria-label="Social links">
                            <h3 className="sm-socials-title">Socials</h3>
                            <ul className="sm-socials-list" role="list">
                                {socialItems.map((s, i) => (
                                    <li key={s.label + i} className="sm-socials-item">
                                        <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                                            {s.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </aside>
        </div>
    );
};

export default StaggeredMenu;
