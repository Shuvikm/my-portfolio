import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ScrollStack.css';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStackProps {
    children: React.ReactNode[];
    itemHeight?: number;
    gap?: number;
}

const ScrollStack: React.FC<ScrollStackProps> = ({
    children,
    itemHeight = 400,
    gap = 20
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !children.length) return;

        const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

        items.forEach((item, index) => {
            const startTrigger = index === 0 ? 'top top' : 'top bottom';

            gsap.to(item, {
                scrollTrigger: {
                    trigger: item,
                    start: startTrigger,
                    end: 'bottom top',
                    scrub: 0.5,
                    pin: index < items.length - 1,
                    pinSpacing: index === 0,
                },
                scale: 0.9,
                opacity: 0.5,
                y: -50,
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [children]);

    return (
        <div ref={containerRef} className="scroll-stack-container">
            {React.Children.map(children, (child, index) => (
                <div
                    ref={(el) => (itemsRef.current[index] = el)}
                    className="scroll-stack-item"
                    style={{
                        minHeight: itemHeight,
                        marginBottom: index < children.length - 1 ? gap : 0
                    }}
                >
                    {child}
                </div>
            ))}
        </div>
    );
};

export default ScrollStack;
