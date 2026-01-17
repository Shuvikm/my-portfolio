// Performance monitoring utility

export const measurePerformance = () => {
    if ('performance' in window) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        const connectTime = perfData.responseEnd - perfData.requestStart;
        const renderTime = perfData.domComplete - perfData.domLoading;

        console.log('Performance Metrics:', {
            pageLoadTime: `${pageLoadTime}ms`,
            connectTime: `${connectTime}ms`,
            renderTime: `${renderTime}ms`,
        });

        return { pageLoadTime, connectTime, renderTime };
    }
    return null;
};

export const logComponentRender = (componentName: string) => {
    if (process.env.NODE_ENV === 'development') {
        performance.mark(`${componentName}-start`);
        return () => {
            performance.mark(`${componentName}-end`);
            performance.measure(
                `${componentName} render`,
                `${componentName}-start`,
                `${componentName}-end`
            );
        };
    }
    return () => { };
};
