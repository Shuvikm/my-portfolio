/**
 * Responsive design utilities
 */

export const breakpoints = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
    wide: 1440,
} as const;

export const mediaQuery = {
    mobile: `@media (max-width: ${breakpoints.tablet - 1}px)`,
    tablet: `@media (min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
    desktop: `@media (min-width: ${breakpoints.desktop}px)`,
    wide: `@media (min-width: ${breakpoints.wide}px)`,
} as const;

export const isMobile = () => window.innerWidth < breakpoints.tablet;
export const isTablet = () => window.innerWidth >= breakpoints.tablet && window.innerWidth < breakpoints.desktop;
export const isDesktop = () => window.innerWidth >= breakpoints.desktop;
