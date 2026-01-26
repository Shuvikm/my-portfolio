/**
 * Asset optimization utilities
 */

export const compressImageDataUrl = (dataUrl: string, quality = 0.8): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d')!;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.src = dataUrl;
    });
};

export const loadImageOptimized = (src: string, quality = 0.8): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.loading = 'lazy';
        img.decoding = 'async';
        img.src = src;
    });
};
