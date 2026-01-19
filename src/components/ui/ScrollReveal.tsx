import { useRef, useLayoutEffect, ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
    children: ReactNode;
    delay?: number;
    className?: string;
}

export default function ScrollReveal({ children, delay = 0, className = "" }: ScrollRevealProps) {
    const el = useRef(null);

    useLayoutEffect(() => {
        // Wait for a brief moment to ensure DOM is ready and layout is settled
        const ctx = gsap.context(() => {
            if (el.current) {
                gsap.fromTo(el.current,
                    {
                        opacity: 0,
                        y: 50,
                        scale: 0.95
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: delay,
                        scrollTrigger: {
                            trigger: el.current,
                            start: 'top 85%', // Trigger when top of element hits 85% of viewport height
                            toggleActions: 'play none none reverse' // Replay on scroll back up? Or just play once? User said "pop up effect", usually implies entrance. 'play none none none' is safer, but 'play none none reverse' feels more dynamic. Let's stick to simple play.
                        }
                    }
                );
            }
        });

        return () => ctx.revert();
    }, [delay]);

    return (
        <div ref={el} className={className}>
            {children}
        </div>
    );
}
