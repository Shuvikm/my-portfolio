/**
 * Smooth scroll utility with easing
 */

export const smoothScrollTo = (targetY: number, duration = 800) => {
    const startY = window.pageYOffset;
    const diff = targetY - startY;
    const startTime = performance.now();

    const easeInOutCubic = (t: number): number => {
        return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const scroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = easeInOutCubic(progress);

        window.scrollTo(0, startY + diff * easeProgress);

        if (progress < 1) {
            requestAnimationFrame(scroll);
        }
    };

    requestAnimationFrame(scroll);
};

export const scrollToElement = (selector: string, offset = 0) => {
    const element = document.querySelector(selector);
    if (element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset + offset;
        smoothScrollTo(targetPosition);
    }
};
