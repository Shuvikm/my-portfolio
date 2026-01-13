import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for Intersection Observer
 * Useful for lazy loading, scroll animations, etc.
 */
export const useIntersectionObserver = (
    callback: (entry: IntersectionObserverEntry) => void,
    options?: IntersectionObserverInit
) => {
    const targetRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const target = targetRef.current;
        if (!target) return;

        const observer = new IntersectionObserver(([entry]) => {
            callback(entry);
        }, options);

        observer.observe(target);

        return () => {
            observer.disconnect();
        };
    }, [callback, options]);

    return targetRef;
};

/**
 * Custom hook for window resize events
 * Includes debouncing for better performance
 */
export const useWindowSize = (delay = 200) => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        let timeoutId: number;

        const handleResize = () => {
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(() => {
                setSize({
                    width: window.innerWidth,
                    height: window.innerHeight,
                });
            }, delay);
        };

        window.addEventListener('resize', handleResize);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', handleResize);
        };
    }, [delay]);

    return size;
};
