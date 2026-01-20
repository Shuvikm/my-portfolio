import { useEffect, useRef, useState } from 'react';
import './TrueFocus.css';

interface TrueFocusProps {
    text: string;
    interval?: number;
    className?: string;
}

export default function TrueFocus({ text, interval = 1000, className = '' }: TrueFocusProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const words = text.split(' ');
    const timerRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        timerRef.current = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % words.length);
        }, interval);

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [words.length, interval]);

    return (
        <div className={`true-focus ${className}`}>
            {words.map((word, index) => (
                <span
                    key={index}
                    className={`true-focus-word ${index === activeIndex ? 'active' : ''}`}
                >
                    {word}
                </span>
            ))}
        </div>
    );
}
