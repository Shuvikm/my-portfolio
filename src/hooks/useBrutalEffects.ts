import { useEffect } from 'react';

export function useBrutalEffects() {
    useEffect(() => {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        const cursor = document.getElementById('cursor');
        let animationFrameId: number;

        const onMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove, { passive: true });

        function lerp(start: number, end: number, factor: number) {
            return start + (end - start) * factor;
        }

        function animateCursor() {
            cursorX = lerp(cursorX, mouseX, 0.15);
            cursorY = lerp(cursorY, mouseY, 0.15);
            if (cursor) {
                cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
            }
            animationFrameId = requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Magnet Effect using React generic listeners rather than direct binding 
        // to avoid missing lazy loaded elements, but the prompt uses simple document.query
        // We will attach to them directly after a short timeout to allow rendering.

        const handleMagnetMove = (e: Event) => {
            const mouseEvent = e as MouseEvent;
            const target = mouseEvent.currentTarget as HTMLElement;
            if (target && cursor) {
                const rect = target.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                const dist = 0.5; // Magnetic strength

                const moveX = (mouseEvent.clientX - centerX) * dist;
                const moveY = (mouseEvent.clientY - centerY) * dist;

                target.style.transform = `translate(${moveX}px, ${moveY}px)`;
                cursor.classList.add('magnet');
            }
        };

        const handleMagnetLeave = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            if (target) {
                target.style.transform = 'translate(0, 0)';
                if (cursor) cursor.classList.remove('magnet');
            }
        };

        // Hacker Text
        const alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const intervals = new Map<HTMLElement, ReturnType<typeof setInterval>>();

        const handleHackerEnter = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            const original = target.getAttribute('data-text');
            if (!original) return;

            let iter = 0;
            if (intervals.has(target)) clearInterval(intervals.get(target)!);

            const interval = setInterval(() => {
                target.innerText = original.split("")
                    .map((l, i) => {
                        if (i < iter) return original[i];
                        return alpha[Math.floor(Math.random() * 26)];
                    })
                    .join("");

                if (iter >= original.length) {
                    clearInterval(interval);
                    intervals.delete(target);
                }
                iter += 1 / 3;
            }, 30);
            intervals.set(target, interval);
        };

        const handleHackerLeave = (e: Event) => {
            const target = e.currentTarget as HTMLElement;
            const original = target.getAttribute('data-text');
            if (!original) return;

            if (intervals.has(target)) {
                clearInterval(intervals.get(target)!);
                intervals.delete(target);
            }
            target.innerText = original;
        };

        let magneticElements: NodeListOf<Element>;
        let hackerElements: NodeListOf<Element>;

        const setupEventListeners = () => {
            magneticElements = document.querySelectorAll('.magnetic');
            magneticElements.forEach(el => {
                el.addEventListener('mousemove', handleMagnetMove);
                el.addEventListener('mouseleave', handleMagnetLeave);
            });

            hackerElements = document.querySelectorAll('[data-text]');
            hackerElements.forEach(el => {
                el.addEventListener('mouseenter', handleHackerEnter);
                el.addEventListener('mouseleave', handleHackerLeave);
            });
        }

        // Set them up after a short delay to ensure DOM is ready
        const timeoutId = setTimeout(setupEventListeners, 300);

        // Navbar state & 3D tilt
        let isScrolled = false;

        const onScroll = () => {
            const nav = document.querySelector('.brutal-nav') as HTMLElement;
            if (window.scrollY > 100) {
                if (!isScrolled && nav) {
                    nav.classList.add('scrolled');
                    isScrolled = true;
                }
            } else {
                if (isScrolled && nav) {
                    nav.classList.remove('scrolled');
                    nav.style.transform = '';
                    isScrolled = false;
                }
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });

        const onNavTilt = (e: MouseEvent) => {
            const nav = document.querySelector('.brutal-nav') as HTMLElement;
            if (!isScrolled || !nav) return;
            const cx = window.innerWidth / 2;
            const cy = 100; // Pivot near top

            // Subtle tilt
            const rx = (e.clientY - cy) * 0.02;
            const ry = (e.clientX - cx) * 0.02;

            const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);
            nav.style.transform = `translateX(-50%) perspective(1000px) rotateX(${-clamp(rx, -10, 10)}deg) rotateY(${clamp(ry, -10, 10)}deg)`;
        };

        document.addEventListener('mousemove', onNavTilt, { passive: true });

        // Scroll Velocity Skew
        let skew = 0;
        let lastScrollTop = 0;
        let skewRafId: number;

        function scrollLoop() {
            const content = document.getElementById('scroll-content');
            const scrollTop = window.scrollY;
            const velocity = scrollTop - lastScrollTop;
            lastScrollTop = scrollTop;

            const maxSkew = 5.0;
            const speed = Math.min(Math.max(velocity * 0.1, -maxSkew), maxSkew);

            skew = lerp(skew, speed, 0.1);

            if (content) {
                if (Math.abs(skew) > 0.01) {
                    content.style.transform = `skewY(${skew}deg)`;
                } else {
                    content.style.transform = `skewY(0deg)`;
                }
            }
            skewRafId = requestAnimationFrame(scrollLoop);
        }
        scrollLoop();

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('mousemove', onNavTilt);
            clearTimeout(timeoutId);
            cancelAnimationFrame(animationFrameId);
            cancelAnimationFrame(skewRafId);
            intervals.forEach(interval => clearInterval(interval));

            if (magneticElements) {
                magneticElements.forEach(el => {
                    el.removeEventListener('mousemove', handleMagnetMove);
                    el.removeEventListener('mouseleave', handleMagnetLeave);
                });
            }
            if (hackerElements) {
                hackerElements.forEach(el => {
                    el.removeEventListener('mouseenter', handleHackerEnter);
                    el.removeEventListener('mouseleave', handleHackerLeave);
                });
            }
        };
    }, []);
}
