import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('❌ Error caught by ErrorBoundary:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
                    <div className="text-center p-8 manga-panel max-w-2xl">
                        <h1 className="text-4xl font-bold mb-4 text-[#fbbf24]">⚠️ Something Went Wrong</h1>
                        <div className="mb-6">
                            <p className="text-xl text-white/80 mb-2">An error occurred:</p>
                            <code className="block bg-black/50 p-4 rounded text-red-400 text-left overflow-auto">
                                {this.state.error?.message}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="manga-button px-8 py-3"
                        >
                            🔄 Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
