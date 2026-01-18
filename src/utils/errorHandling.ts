/**
 * Error boundary utility component
 * Better error handling for production
 */

export class AppError extends Error {
    constructor(
        message: string,
        public code?: string,
        public statusCode?: number
    ) {
        super(message);
        this.name = 'AppError';
    }
}

export const handleError = (error: Error, context?: string) => {
    console.error(`Error in ${context || 'Application'}:`, error);

    // In production, you could send this to an error tracking service
    if (process.env.NODE_ENV === 'production') {
        // Send to error tracking service (e.g., Sentry)
    }
};

export const isAppError = (error: unknown): error is AppError => {
    return error instanceof AppError;
};
