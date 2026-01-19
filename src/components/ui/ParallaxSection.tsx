import { useEffect, useRef, ReactNode } from 'react';

interface ParallaxSectionProps {
    children: ReactNode;
    speed?: number; // 0.1 = slow, 1 = normal speed
    className?: string;
}

export default function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const section = sectionRef.current;
            const rect = section.getBoundingClientRect();
            const scrolled = window.scrollY;

            // Only apply parallax when element is in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                section.style.transform = `translateY(${yPos}px)`;
            }
        };

        // Initial call
        handleScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [speed]);

    return (
        <div ref={sectionRef} className={`transition-transform duration-100 ease-out ${className}`}>
            {children}
        </div>
    );
}
