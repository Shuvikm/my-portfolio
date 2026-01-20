import { X, Download } from 'lucide-react';
import { useEffect } from 'react';

interface ResumeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
    // Handle ESC key press
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            // Prevent body scroll when modal is open
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/95 overflow-y-auto"
            onClick={onClose}
            style={{ overflowY: 'scroll' }}
        >
            {/* Close button - top right with X icon */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent background click
                    onClose();
                }}
                className="fixed top-4 right-4 z-[100] p-3 bg-[#dc2626] hover:bg-[#fbbf24] text-white hover:text-[#1a1a1a] rounded-full shadow-xl transition-all duration-300 hover:scale-110 group"
                aria-label="Close resume"
                style={{ position: 'fixed' }}
            >
                <X className="w-7 h-7" />
            </button>

            {/* Back button - top left */}
            <button
                onClick={(e) => {
                    e.stopPropagation(); // Prevent background click
                    onClose();
                }}
                className="fixed top-4 left-4 z-[100] px-4 py-3 bg-[#fbbf24] hover:bg-[#dc2626] text-[#1a1a1a] hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-bold text-lg"
                aria-label="Go back"
                style={{ position: 'fixed' }}
            >
                <span>← BACK</span>
            </button>

            {/* Download button - top right, below close button */}
            <a
                href="/resume.pdf"
                download="Shuvik_M_Resume.pdf"
                onClick={(e) => e.stopPropagation()}
                className="fixed top-20 right-4 z-[100] px-4 py-3 bg-[#fbbf24] hover:bg-[#dc2626] text-[#1a1a1a] hover:text-white rounded-full shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2 font-bold"
                style={{ position: 'fixed' }}
            >
                <Download className="w-5 h-5" />
                <span className="hidden sm:inline">PDF</span>
            </a>

            {/* Scrollable content */}
            <div
                className="min-h-screen flex flex-col items-center py-24 px-4"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Title at top */}
                <h3 className="text-3xl font-black text-[#fbbf24] mb-6 tracking-wide">
                    SHUVIK M - RESUME
                </h3>

                {/* Resume image - enhanced for 8K quality */}
                <div className="manga-panel bg-white p-6 max-w-5xl w-full shadow-2xl">
                    <img
                        src="/resume.png"
                        alt="Shuvik M Resume"
                        className="w-full h-auto"
                        style={{
                            imageRendering: 'crisp-edges',
                            maxWidth: '100%',
                            height: 'auto',
                        }}
                        loading="eager"
                        decoding="async"
                    />
                </div>

                {/* Scroll hint at bottom */}
                <div className="mt-6 text-white/70 text-sm text-center space-y-2">
                    <p className="text-[#fbbf24] font-semibold">↕ Scroll to see full resume</p>
                    <p>Press ESC, click X, or BACK to close</p>
                </div>
            </div>
        </div>
    );
}
