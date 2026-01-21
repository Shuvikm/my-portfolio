import { useCallback } from 'react';

/**
 * Custom hook for smooth scrolling to sections
 * @returns scrollToSection function
 */
export const useScrollTo = () => {
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    return scrollToSection;
};
