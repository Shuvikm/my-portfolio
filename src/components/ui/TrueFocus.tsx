import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

interface TrueFocusProps {
    sentence: string;
    manualMode?: boolean;
    blurAmount?: number;
    borderColor?: string;
    animationDuration?: number;
    pauseBetweenAnimations?: number;
    className?: string;
}

export default function TrueFocus({
    sentence,
    manualMode = false,
    blurAmount = 5,
    borderColor = '#5227FF',
    animationDuration = 0.5,
    pauseBetweenAnimations = 1,
    className = ''
}: TrueFocusProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const words = sentence.split(' ');
    const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (manualMode) return;

        const totalDuration = (animationDuration + pauseBetweenAnimations) * 1000;
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % words.length);
        }, totalDuration);

        return () => clearInterval(timer);
    }, [words.length, manualMode, animationDuration, pauseBetweenAnimations]);

    return (
        <div
            ref={containerRef}
            className={`focus-container ${className}`}
            style={{ '--border-color': borderColor } as React.CSSProperties}
        >
            {words.map((word, index) => {
                const isActive = index === activeIndex;
                return (
                    <span
                        key={index}
                        ref={(el) => (wordRefs.current[index] = el)}
                        className={`focus-word ${isActive ? 'active' : ''}`}
                        style={{
                            filter: isActive ? 'blur(0)' : `blur(${blurAmount}px)`,
                            transition: `filter ${animationDuration}s ease, color ${animationDuration}s ease`,
                        }}
                        onClick={() => manualMode && setActiveIndex(index)}
                    >
                        {word}
                        {isActive && (
                            <div className="focus-frame">
                                <div className="corner top-left"></div>
                                <div className="corner top-right"></div>
                                <div className="corner bottom-left"></div>
                                <div className="corner bottom-right"></div>
                            </div>
                        )}
                    </span>
                );
            })}
        </div>
    );
}
