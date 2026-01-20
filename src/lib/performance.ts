// Performance utility functions for monitoring and optimization

/**
 * Detects if the device is low-end based on hardware concurrency and memory
 */
export const isLowEndDevice = (): boolean => {
    // Check hardware concurrency (CPU cores)
    const cores = navigator.hardwareConcurrency || 2;

    // Check device memory if available
    const memory = (navigator as any).deviceMemory;

    // Low-end if fewer than 4 cores or less than 4GB RAM
    return cores < 4 || (memory && memory < 4);
};

/**
 * Detects if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detects if device is mobile
 */
export const isMobileDevice = (): boolean => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
    );
};

/**
 * Performance configuration based on device capabilities
 */
export const getPerformanceConfig = () => {
    const isLowEnd = isLowEndDevice();
    const isMobile = isMobileDevice();
    const reducedMotion = prefersReducedMotion();

    return {
        // Adjust particle counts based on device
        particleMultiplier: isLowEnd || isMobile ? 0.5 : 1.0,

        // Disable expensive effects on low-end devices
        enableBloom: !isLowEnd && !reducedMotion,

        // Reduce animation complexity
        animationSpeed: reducedMotion ? 0 : isLowEnd ? 0.5 : 1.0,

        // Lower quality settings
        pixelRatio: isLowEnd || isMobile ? 1.0 : 1.5,

        // Device flags
        isLowEnd,
        isMobile,
        reducedMotion
    };
};

/**
 * Simple FPS monitor for development
 */
export class FPSMonitor {
    private frames: number[] = [];
    private lastTime: number = performance.now();
    private isRunning: boolean = false;

    start() {
        this.isRunning = true;
        this.update();
    }

    stop() {
        this.isRunning = false;
    }

    private update = () => {
        if (!this.isRunning) return;

        const now = performance.now();
        const delta = now - this.lastTime;
        this.lastTime = now;

        const fps = 1000 / delta;
        this.frames.push(fps);

        // Keep only last 60 frames
        if (this.frames.length > 60) {
            this.frames.shift();
        }

        requestAnimationFrame(this.update);
    };

    getAverageFPS(): number {
        if (this.frames.length === 0) return 0;
        const sum = this.frames.reduce((a, b) => a + b, 0);
        return Math.round(sum / this.frames.length);
    }

    getCurrentFPS(): number {
        return this.frames.length > 0 ? Math.round(this.frames[this.frames.length - 1]) : 0;
    }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: ReturnType<typeof setTimeout> | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for performance optimization
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean = false;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
