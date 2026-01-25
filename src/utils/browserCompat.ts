/**
 * Browser compatibility utilities
 */

export const isBrowserSupported = (): boolean => {
    // Check for essential features
    const hasIntersectionObserver = 'IntersectionObserver' in window;
    const hasLocalStorage = typeof Storage !== 'undefined';
    const hasCustomElements = 'customElements' in window;

    return hasIntersectionObserver && hasLocalStorage && hasCustomElements;
};

export const getBrowserInfo = () => {
    const ua = navigator.userAgent;
    let browserName = 'Unknown';

    if (ua.indexOf('Firefox') > -1) browserName = 'Firefox';
    else if (ua.indexOf('Chrome') > -1) browserName = 'Chrome';
    else if (ua.indexOf('Safari') > -1) browserName = 'Safari';
    else if (ua.indexOf('Edge') > -1) browserName = 'Edge';

    return { browserName, ua };
};
